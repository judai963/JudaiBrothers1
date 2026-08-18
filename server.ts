import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// System instruction for the Virtual Plumber
const SYSTEM_INSTRUCTION = `You are "Virtual Plumber", the master plumbing AI diagnostic specialist for Judai Brothers Plumbing (AZ ROC #354554).
Judai Brothers is Greater Phoenix's trusted, family-owned plumbing company serving Phoenix, Scottsdale, Mesa, Chandler, Gilbert, Tempe, Glendale, Peoria, Surprise, Goodyear, Buckeye, and all surrounding areas.

YOUR IDENTITY & EXPERTISE:
- You are warm, reassuring, highly practical, and know EVERYTHING about residential and commercial plumbing.
- You speak like a seasoned, trustworthy master plumber who genuinely wants to help homeowners solve their problems safely and without stress.
- You understand Phoenix plumbing conditions deeply:
  * Extremely hard water (15-25+ grains per gallon / GPG) causing rapid calcium scale, element burnouts, and premature tank failures.
  * Water pressure regulator (PRV) failures due to high municipal main pressure (>80 PSI), causing pinhole leaks, pipe knocking (water hammer), and running toilets.
  * Arizona slab leaks caused by copper pipe friction beneath post-tension or concrete foundation slabs.
  * Sewer line tree root intrusion, bellied sewer pipes, and grease buildup.
  * High-efficiency gas and electric tankless water heaters (Navien, Rinnai, Bradford White).
  * Whole-home water softeners (Fleck/Clack valves) and 5-stage reverse osmosis systems.

JUDAI BROTHERS' CORE VALUES & FLAT RATES:
- 100% Upfront Transparent Flat Rates with $0 Trip Fees & Zero Overtime Charges (even nights & weekends).
- 1-Year Workmanship Warranty on all repairs, non-commissioned master craftsmen.
- Contact Number: (480) 938-3803. Direct email: Jalal@judaibrothers.com.
- Instant Online Booking with Housecall Pro integration.

POPULAR FLAT RATES TO REFERENCE WHEN RELEVANT:
- Standard 40/50 Gal Water Heater Replacement: $1,489 (Gas/Electric, complete with haul-away, new valves, drip pan)
- Tankless Water Heater Install: $2,850
- Water Heater Diagnostic & Flush / Element Tune-up: $149
- Drain Snaking / Clearing (up to 75 ft): $139
- Main Sewer Hydro-Jetting (with free camera inspection): $449
- High-Definition Sewer Camera Inspection: $189
- Whole-Home Water Softener (48k grain system): $1,695
- Under-Sink 5-Stage Reverse Osmosis System: $595
- Acoustic / Thermal Slab Leak Electronic Detection: $395
- PRV Pressure Reducing Valve Replacement: $425
- Garbage Disposal Replacement (1/2 HP Badger 5): $265
- Toilet Rebuild / Wax Ring / Flange Repair: $185
- Toilet Replacement (New Kohler/Toto high-efficiency): $385
- Whole-House PEX Repipe: from $3,850

DIAGNOSTIC GUIDELINES:
1. Empathy & Safety First: If the customer describes an active leak, sewer backup, or gas smell, FIRST guide them to isolate the emergency (e.g. main water shutoff at the front hose bibb/meter box, shutoff gas valve, or turn off circuit breaker).
2. Step-by-step troubleshooting: Explain what is likely happening in plain, friendly English, what tools/parts are involved, and whether it's safe for a DIY quick check or requires a licensed plumber.
3. Recommend clear options: Suggest practical next steps and give estimated costs matching Judai Brothers' flat rate catalog.
4. Keep answers clean, well-formatted with markdown (bullet points, bold key terms), and offer to schedule a $0 trip fee visit or call (480) 938-3803.`;

// Helper to generate expert master plumber diagnostic responses based on prompt keywords & context
function getLocalPlumberDiagnosis(userPrompt: string, userCity?: string): {
  reply: string;
  recommendedService: any;
  isEmergency: boolean;
} {
  const lower = userPrompt.toLowerCase();
  let reply = '';
  let recommendedService: any = null;
  let isEmergency = false;

  if (lower.includes('water heater') || lower.includes('hot water') || lower.includes('rumbling') || lower.includes('popping') || lower.includes('pilot') || lower.includes('tankless')) {
    if (lower.includes('tankless')) {
      reply = `### 💧 Tankless Water Heater Diagnostic\n\nTankless units in the Phoenix Valley require periodic descaling due to our high mineral hardness (15–25 GPG):\n\n1. **Error Codes (e.g. E011/E110 on Navien/Rinnai)**: Usually indicates scale buildup in the heat exchanger or flame sensor corrosion.\n2. **Immediate Flush & Descaling**: A vinegar flush (**$189 flat rate**) removes baked calcium and restores hot water output.\n3. **Full System Replacement**: Complete brand-new Navien/Rinnai high-efficiency installation is **$2,850 flat rate**.\n\nWould you like to schedule a technician with **$0 trip fees**?`;
      recommendedService = { id: 'wh-02', title: 'Tankless Water Heater Installation & Upgrade', price: 2850, category: 'water-heaters' };
    } else if (lower.includes('flush') || lower.includes('tune-up') || lower.includes('anode')) {
      reply = `### 💧 Water Heater Flush & Tune-Up\n\nIn Phoenix, sediment builds up 3x faster than national averages due to heavy calcium and magnesium in municipal water:\n\n1. **Symptoms**: Popping or kettle-like rumbling sounds at the bottom of your tank.\n2. **Solution**: Our master plumber flushes out mineral sediment, inspects the sacrificial anode rod, tests the T&P relief valve, and checks burner/element health for **$149 flat rate**.\n\nAll appointments come with **$0 trip fees** and a 1-Year Workmanship Warranty.`;
      recommendedService = { id: 'wh-04', title: 'Water Heater Flush & Anode Rod Tune-Up', price: 149, category: 'water-heaters' };
    } else {
      reply = `### 💧 Water Heater Diagnostic Breakdown\n\nBased on your description, here is what our master plumbers look for in the ${userCity || 'Phoenix Metro'} area:\n\n1. **Rumbling / Popping Noises**: In the Valley, our hard water (15–25 GPG) causes heavy calcium carbonate sediment to bake at the bottom of your tank. Steam bubbles get trapped underneath the sediment layer and burst, creating that rumbling kettle sound.\n2. **Immediate Action**: If your unit is under 6–8 years old, a **Professional Flush & Element Descaling ($149 flat rate)** often restores efficiency and quiets the tank.\n3. **Replacement Threshold**: If the tank is over 8–10 years old or leaking from the base welds, replacing it before a catastrophic rupture is essential. Our complete **40/50 Gallon Replacement is $1,489 flat rate** (includes brand new Bradford White/Rheem unit, new brass valves, pan, gas/electric hookup, and old unit haul-away).\n\nWould you like to schedule a **$0 trip fee inspection** or discuss tankless upgrades?`;
      recommendedService = { id: 'wh-01', title: 'Standard Tank Water Heater Replacement (40/50 Gal)', price: 1489, category: 'water-heaters' };
    }
  } else if (lower.includes('slab leak') || lower.includes('warm floor') || lower.includes('hot spot') || lower.includes('water bill') || lower.includes('under foundation')) {
    reply = `### 🔍 Slab Leak Diagnostic Alert\n\nWarm spots on your flooring, the sound of rushing water when all fixtures are off, or a sudden spike in your city water bill are the hallmark symptoms of an **under-slab copper pinhole leak**.\n\n**Immediate Step**: Check your outdoor water meter. If the little triangular/circular leak indicator dial is spinning while everything is closed inside, you have an active pressurized leak.\n\n**Judai Brothers Protocol**:\n- We perform **Acoustic & Thermal Electronic Slab Leak Detection ($395 flat rate)** without tearing up your flooring unnecessarily.\n- Once pinpointed, we can do a localized direct repair or an overhead PEX bypass line to protect your home permanently.\n\nCall our 24/7 dispatch right away at **(480) 938-3803** or book an immediate diagnostic!`;
    recommendedService = { id: 'lr-01', title: 'Electronic Acoustic & Thermal Slab Leak Detection', price: 395, category: 'leaks-repipe' };
    isEmergency = true;
  } else if (lower.includes('drain') || lower.includes('clog') || lower.includes('gurgling') || lower.includes('toilet backup') || lower.includes('shower backup') || lower.includes('sewer')) {
    if (lower.includes('hydro') || lower.includes('jetting') || lower.includes('tree root') || lower.includes('main line')) {
      reply = `### 🌊 Main Sewer Line Hydro-Jetting\n\nIf recurring clogs or tree root intrusions keep blocking your sewer line, mechanical snaking only punches a small temporary hole. **Hydro-Jetting ($449 flat rate)** blasts 4,000 PSI high-pressure water through your line:\n\n1. Clears 100% of grease, scale, sludge, and tree root fibers.\n2. Restores pipes to factory interior diameter.\n3. **Includes a Full Video Camera Inspection** before and after.\n\nWould you like to reserve a $0 trip fee arrival window?`;
      recommendedService = { id: 'dr-02', title: 'Main Line Hydro-Jetting with Video Inspection', price: 449, category: 'drains' };
    } else {
      reply = `### 🛑 Drain & Sewer Line Diagnosis\n\nIf multiple fixtures are draining slowly or your shower gurgles when the toilet flushes, the blockage is in your **main sewer line** rather than an individual trap.\n\n**Diagnostic Options**:\n- **Single Fixture Clog (Sink/Tub/Toilet)**: Cleared with commercial rigid cable snaking (**$139 flat rate**).\n- **Main Sewer Line Backups**: Cleared via exterior cleanout (**$189 flat rate** with camera inspection included).\n- **Heavy Grease / Tree Roots**: Hydro-jetting at 4,000 PSI scours the pipe walls back to 100% factory diameter (**$449 flat rate**).\n\n*Pro Tip*: Avoid pouring caustic chemical drain cleaners down your pipes; they heat up and can weaken PVC glued joints or corrode older cast iron lines.`;
      recommendedService = { id: 'dr-01', title: 'Standard Drain Snaking & Cleanout', price: 139, category: 'drains' };
    }
  } else if (lower.includes('disposal') || lower.includes('garbage disposal') || lower.includes('badger') || lower.includes('sink hum')) {
    reply = `### 🗑️ Garbage Disposal Diagnostic\n\nIf your disposal is humming but the blades won't spin, the motor has locked or a foreign object is jammed between the impeller and shredder ring.\n\n**Quick DIY Safety Check**:\n1. **Turn off the wall switch** (and unplug under sink if possible).\n2. Insert a 1/4" Allen hex wrench into the center socket on the **bottom of the disposal** under your sink and rotate back and forth to dislodge the jam.\n3. Press the red thermal reset button on the bottom.\n\n**If the motor is burned out or leaking from the bottom casing**: We install a brand new **InSinkErator Badger 5 (1/2 HP)** with new plumbing connections and haul-away for **$265 flat rate complete**.`;
    recommendedService = { id: 'fs-04', title: 'Garbage Disposal Replacement (1/2 HP Badger 5)', price: 265, category: 'faucets-sinks' };
  } else if (lower.includes('pressure') || lower.includes('prv') || lower.includes('hammer') || lower.includes('banging') || lower.includes('high water pressure')) {
    reply = `### ⚡ High Water Pressure & PRV Failure\n\nPhoenix city water mains frequently deliver water at **90 to 120+ PSI**. Safe residential plumbing requires **50 to 70 PSI**.\n\n**Symptoms of a Failed Pressure Regulating Valve (PRV)**:\n- Loud banging / "water hammer" when valves close.\n- Toilets running intermittently on their own.\n- Relief valves dripping on your water heater.\n- Shower heads and aerators blowing out seals.\n\n**Solution**: We replace faulty brass PRV valves and calibrate your entire home to a safe 60 PSI for **$425 flat rate** (1-Year Warranty).`;
    recommendedService = { id: 'lr-04', title: 'Pressure Reducing Valve (PRV) Replacement', price: 425, category: 'leaks-repipe' };
  } else if (lower.includes('hard water') || lower.includes('softener') || lower.includes('ro') || lower.includes('white spots') || lower.includes('calcium') || lower.includes('drinking water')) {
    if (lower.includes('ro') || lower.includes('reverse osmosis') || lower.includes('filter')) {
      reply = `### 💧 Pure Drinking Water: 5-Stage Reverse Osmosis (RO)\n\nPhoenix tap water contains elevated dissolved minerals, chlorine, and trace elements. Our premium 5-Stage Under-Sink RO system delivers crisp, bottled-quality water on demand:\n\n- **Filtration**: 5-stage filtration with high-recovery membrane.\n- **Includes**: Lead-free designer faucet, dedicated storage tank, and line to refrigerator ice maker.\n- **Pricing**: **$595 flat rate complete installation**.\n\nNever buy bottled water jugs again!`;
      recommendedService = { id: 'wf-02', title: '5-Stage Under-Sink Reverse Osmosis System', price: 595, category: 'filtration' };
    } else {
      reply = `### 💧 Phoenix Hard Water Solutions\n\nTap water in the Valley ranges from **15 to 25+ grains per gallon (GPG)** of dissolved calcium and magnesium (classed as "Extremely Hard").\n\n**Recommended Upgrades**:\n1. **Whole-Home Water Softener (48,000 Grain Fleck/Clack Valve)**: **$1,695 flat rate complete** — eliminates white crust on shower glass, protects water heaters from scaling, and saves up to 70% on soap.\n2. **5-Stage Under-Sink Reverse Osmosis (RO)**: **$595 flat rate complete** — removes 98%+ of total dissolved solids, chlorine, and arsenic for pure, crisp drinking water at your kitchen sink.\n\nBoth include professional installation, bypass loop tie-in, and full warranties.`;
      recommendedService = { id: 'wf-01', title: 'Whole-Home Water Softener (48,000 Grain)', price: 1695, category: 'filtration' };
    }
  } else if (lower.includes('toilet') || lower.includes('running toilet') || lower.includes('flapper') || lower.includes('ghost flush') || lower.includes('wax ring')) {
    reply = `### 🚽 Toilet Leak & Rebuild Diagnosis\n\nIf your toilet runs randomly ("ghost flushing") or hisses after filling, you are likely losing 30–60 gallons of water per day through a degraded flapper or worn fill valve.\n\n**Judai Brothers Solutions**:\n- **Complete Toilet Rebuild**: Replace fill valve, heavy-duty silicone flapper, tank-to-bowl gasket, and stainless supply line for **$185 flat rate**.\n- **New Toilet Installation**: Brand new Kohler or Toto high-efficiency water-saving toilet installed with reinforced wax seal and brass closet bolts for **$385 flat rate**.\n\nNo trip fees and non-commissioned master plumber workmanship!`;
    recommendedService = { id: 'tl-01', title: 'Complete Toilet Rebuild (Valve + Flapper + Seal)', price: 185, category: 'toilets' };
  } else if (lower.includes('gas') || lower.includes('smell gas') || lower.includes('rotten egg') || lower.includes('burst') || lower.includes('flooding') || lower.includes('gushing')) {
    reply = `### 🚨 URGENT PLUMBING SAFETY ALERT\n\nIf you smell rotten eggs (natural gas) or have gushing water inside your home, take immediate action:\n\n1. **For Gas Leaks**: Do NOT flip light switches, light matches, or use electronics inside. Evacuate immediately and call Southwest Gas (877-860-6020) and 911 from outside.\n2. **For Major Flooding**: Turn off your main water valve immediately (located at your front hose bibb or sidewalk water meter box).\n3. **Call Judai Brothers 24/7 Emergency Dispatch**: **(480) 938-3803** — we have master plumbers on standby across the Valley with **$0 overtime surcharges**.`;
    isEmergency = true;
  } else {
    reply = `### 🔧 Virtual Plumber Diagnostic Assessment\n\nThank you for reaching out to Judai Brothers (**AZ ROC #354554**)! Here is how we evaluate plumbing issues in the ${userCity || 'Phoenix Metro'} area:\n\n1. **Diagnostic Evaluation**: Our master craftsmen carry state-of-the-art diagnostic equipment to inspect fixtures, static water pressure, and sewer drainage.\n2. **100% Upfront Pricing**: You will receive a guaranteed flat rate quote from our 86 published rates before any work begins. There are **$0 trip fees** and **zero overtime fees** on nights or weekends.\n3. **1-Year Warranty**: Every repair and replacement is backed by our full 1-Year Workmanship Guarantee.\n\nWould you like to schedule an inspection or describe specific symptoms (e.g. noise, leak, slow drain, low pressure)?`;
  }

  return { reply, recommendedService, isEmergency };
}

// API Route for Virtual Plumber AI Chat
app.post('/api/virtual-plumber/chat', async (req, res) => {
  const { messages, userContext } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  const latestMessage = messages[messages.length - 1];
  const userPrompt = latestMessage.text || latestMessage.content || '';
  const userCity = userContext?.city || 'Phoenix Metro';

  const ai = getGeminiClient();

  if (ai) {
    // Attempt Gemini with fallback models if high demand (503) occurs
    const candidateModels = ['gemini-3.1-pro-preview', 'gemini-3.7-flash', 'gemini-2.5-flash'];
    let aiSucceeded = false;
    let replyText = '';

    const conversationHistory = messages.slice(0, -1).map((m: any) => {
      return {
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text || m.content || '' }],
      };
    });

    for (const modelName of candidateModels) {
      try {
        const isThinkingMode = modelName === 'gemini-3.1-pro-preview';
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            ...conversationHistory,
            {
              role: 'user',
              parts: [
                {
                  text: `${userContext ? `[Customer Context: Location: ${userCity}, Issue category: ${userContext.category || 'General'}]\n\n` : ''}${userPrompt}`,
                },
              ],
            },
          ],
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            ...(isThinkingMode && { thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH } })
          },
        });

        if (response.text) {
          replyText = response.text;
          aiSucceeded = true;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} call failed (${err?.message || err}). Trying next model or local fallback...`);
      }
    }

    if (aiSucceeded && replyText) {
      // Determine if a specific service is recommended for 1-click booking
      let recommendedService: any = null;
      const lowerReply = (replyText + ' ' + userPrompt).toLowerCase();

      if (lowerReply.includes('water heater') || lowerReply.includes('no hot water') || lowerReply.includes('tankless')) {
        if (lowerReply.includes('flush') || lowerReply.includes('tune-up') || lowerReply.includes('maintenance')) {
          recommendedService = { id: 'wh-04', title: 'Water Heater Flush & Anode Rod Tune-Up', price: 149, category: 'water-heaters' };
        } else if (lowerReply.includes('tankless')) {
          recommendedService = { id: 'wh-02', title: 'Tankless Water Heater Installation', price: 2850, category: 'water-heaters' };
        } else {
          recommendedService = { id: 'wh-01', title: 'Standard Tank Water Heater Replacement', price: 1489, category: 'water-heaters' };
        }
      } else if (lowerReply.includes('drain') || lowerReply.includes('clog') || lowerReply.includes('backing up') || lowerReply.includes('sewer')) {
        if (lowerReply.includes('hydro') || lowerReply.includes('jetting') || lowerReply.includes('main line')) {
          recommendedService = { id: 'dr-02', title: 'Main Line Hydro-Jetting with Video Inspection', price: 449, category: 'drains' };
        } else {
          recommendedService = { id: 'dr-01', title: 'Standard Drain Snaking & Cleanout', price: 139, category: 'drains' };
        }
      } else if (lowerReply.includes('disposal') || lowerReply.includes('garbage disposal') || lowerReply.includes('badger')) {
        recommendedService = { id: 'fs-04', title: 'Garbage Disposal Replacement (1/2 HP Badger 5)', price: 265, category: 'faucets-sinks' };
      } else if (lowerReply.includes('softener') || lowerReply.includes('hard water') || lowerReply.includes('scale')) {
        recommendedService = { id: 'wf-01', title: 'Whole-Home Water Softener (48,000 Grain)', price: 1695, category: 'filtration' };
      } else if (lowerReply.includes('reverse osmosis') || lowerReply.includes('drinking water') || lowerReply.includes('ro system')) {
        recommendedService = { id: 'wf-02', title: '5-Stage Under-Sink Reverse Osmosis System', price: 595, category: 'filtration' };
      } else if (lowerReply.includes('slab leak') || lowerReply.includes('warm floor') || lowerReply.includes('acoustic')) {
        recommendedService = { id: 'lr-01', title: 'Electronic Acoustic & Thermal Slab Leak Detection', price: 395, category: 'leaks-repipe' };
      } else if (lowerReply.includes('pressure') || lowerReply.includes('prv') || lowerReply.includes('regulator') || lowerReply.includes('hammer')) {
        recommendedService = { id: 'lr-04', title: 'Pressure Reducing Valve (PRV) Replacement', price: 425, category: 'leaks-repipe' };
      } else if (lowerReply.includes('toilet') || lowerReply.includes('running toilet') || lowerReply.includes('flapper')) {
        recommendedService = { id: 'tl-01', title: 'Complete Toilet Rebuild (Valve + Flapper + Seal)', price: 185, category: 'toilets' };
      }

      return res.json({
        reply: replyText,
        recommendedService,
        isEmergency: lowerReply.includes('shut off') || lowerReply.includes('emergency') || lowerReply.includes('burst pipe') || lowerReply.includes('flooding') || lowerReply.includes('gas leak'),
      });
    }
  }

  // Graceful fallback to Master Plumber Diagnostic Engine (never return 500 error to user!)
  const localDiag = getLocalPlumberDiagnosis(userPrompt, userCity);
  return res.json(localDiag);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Vite middleware / Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Judai Brothers Server running on port ${PORT}`);
  });
}

startServer();
