import { ServiceArea } from '../types';

export const SERVICE_AREAS: ServiceArea[] = [
  {
    city: 'Phoenix',
    region: 'Central Phoenix',
    zipCodes: ['85001', '85003', '85004', '85006', '85007', '85008', '85009', '85012', '85013', '85014', '85015', '85016', '85018', '85020', '85021', '85022', '85023', '85024', '85027', '85028', '85029', '85032', '85040', '85042', '85044', '85048', '85050', '85054', '85083', '85085'],
    avgResponseMins: 35,
    waterHardnessGrains: '16 - 22 GPG (Very Hard)',
    plumbingNote: 'Central & North Phoenix homes frequently face aging copper pinhole leaks and mineral scaling on water heater elements.',
  },
  {
    city: 'Scottsdale',
    region: 'East Valley',
    zipCodes: ['85250', '85251', '85254', '85255', '85257', '85258', '85259', '85260', '85262', '85266'],
    avgResponseMins: 40,
    waterHardnessGrains: '18 - 25 GPG (Extremely Hard)',
    plumbingNote: 'High water pressure zones in North Scottsdale necessitate PRV regulators to protect high-end fixtures and RO water loops.',
  },
  {
    city: 'Paradise Valley',
    region: 'East Valley',
    zipCodes: ['85253'],
    avgResponseMins: 35,
    waterHardnessGrains: '18 - 24 GPG (Extremely Hard)',
    plumbingNote: 'Estate plumbing systems with recirculating pumps, high-capacity 75-gal water heaters, and whole-home water softening.',
  },
  {
    city: 'Peoria',
    region: 'West Valley',
    zipCodes: ['85345', '85381', '85382', '85383'],
    avgResponseMins: 25,
    waterHardnessGrains: '15 - 20 GPG (Very Hard)',
    plumbingNote: 'Viega ProPress copper repair, tankless conversions in Vistancia, and outdoor main water riser rebuilds.',
  },
  {
    city: 'Glendale',
    region: 'West Valley',
    zipCodes: ['85301', '85302', '85303', '85304', '85305', '85306', '85307', '85308', '85310'],
    avgResponseMins: 30,
    waterHardnessGrains: '15 - 21 GPG (Very Hard)',
    plumbingNote: 'Older 1970s-1990s slab homes with cast iron or early copper under-slab water lines requiring ultrasonic leak detection.',
  },
  {
    city: 'Surprise',
    region: 'West Valley',
    zipCodes: ['85374', '85378', '85379', '85387', '85388'],
    avgResponseMins: 35,
    waterHardnessGrains: '16 - 22 GPG (Very Hard)',
    plumbingNote: 'Expansion tank replacements and whole-home water filtration in modern master-planned communities.',
  },
  {
    city: 'Sun City & Sun City West',
    region: 'West Valley',
    zipCodes: ['85351', '85373', '85375'],
    avgResponseMins: 30,
    waterHardnessGrains: '14 - 19 GPG (Very Hard)',
    plumbingNote: 'Senior comfort-height ADA toilet replacements, grab bar backing, and quiet garbage disposals with zero trip fees.',
  },
  {
    city: 'Goodyear & Avondale',
    region: 'West Valley',
    zipCodes: ['85323', '85338', '85392', '85395'],
    avgResponseMins: 40,
    waterHardnessGrains: '17 - 24 GPG (Extremely Hard)',
    plumbingNote: 'New construction water softener loop tie-ins and 5-stage under-sink reverse osmosis system installations.',
  },
  {
    city: 'Tempe',
    region: 'East Valley',
    zipCodes: ['85281', '85282', '85283', '85284'],
    avgResponseMins: 40,
    waterHardnessGrains: '16 - 22 GPG (Very Hard)',
    plumbingNote: 'Commercial backflow compliance tests, multi-family plumbing repairs, and sewer root clearing near ASU.',
  },
  {
    city: 'Chandler & Gilbert',
    region: 'East Valley',
    zipCodes: ['85224', '85225', '85226', '85248', '85249', '85286', '85233', '85234', '85295', '85296', '85297', '85298'],
    avgResponseMins: 45,
    waterHardnessGrains: '16 - 23 GPG (Very Hard)',
    plumbingNote: 'Tankless water heater upgrades, kitchen island prep sink rough-ins, and garage softener loops.',
  },
  {
    city: 'Mesa',
    region: 'East Valley',
    zipCodes: ['85201', '85202', '85203', '85204', '85205', '85206', '85207', '85208', '85209', '85210', '85212', '85213', '85215'],
    avgResponseMins: 45,
    waterHardnessGrains: '16 - 22 GPG (Very Hard)',
    plumbingNote: 'Sewer hydrojetting, main water shutoff valve rebuilds, and water heater replacements.',
  },
  {
    city: 'Cave Creek & Carefree',
    region: 'North Valley',
    zipCodes: ['85327', '85331', '85377'],
    avgResponseMins: 45,
    waterHardnessGrains: '18 - 26 GPG (Extreme Hardness)',
    plumbingNote: 'Well water filtration, UV disinfection chambers, and custom bathroom fixture rough-ins.',
  },
  {
    city: 'Anthem & New River',
    region: 'North Valley',
    zipCodes: ['85086', '85087'],
    avgResponseMins: 40,
    waterHardnessGrains: '16 - 22 GPG (Very Hard)',
    plumbingNote: 'Water heater replacements, pressure reducing valve calibration, and outdoor frost-proof hose bibbs.',
  },
  {
    city: 'Buckeye & Litchfield Park',
    region: 'West Valley',
    zipCodes: ['85326', '85340'],
    avgResponseMins: 45,
    waterHardnessGrains: '18 - 25 GPG (Extremely Hard)',
    plumbingNote: 'Water treatment loops, reverse osmosis installations, and kitchen faucet installations.',
  }
];

export function checkZipCodeCoverage(zip: string): {
  covered: boolean;
  area?: ServiceArea;
  message: string;
} {
  const cleanZip = zip.trim();
  const found = SERVICE_AREAS.find((area) => area.zipCodes.includes(cleanZip));
  if (found) {
    return {
      covered: true,
      area: found,
      message: `Full coverage in ${found.city}, AZ (${cleanZip}). Standard dispatch response within ${found.avgResponseMins} mins. $0 trip fees.`,
    };
  }

  // Check if it starts with 850, 852, 853 (Valley general prefix)
  if (cleanZip.startsWith('850') || cleanZip.startsWith('852') || cleanZip.startsWith('853')) {
    return {
      covered: true,
      message: `Valley-wide coverage active for ZIP ${cleanZip}. On-call master plumbers dispatched from nearest Valley truck. $0 trip fees.`,
    };
  }

  return {
    covered: false,
    message: `ZIP ${cleanZip} is outside our core Phoenix Valley emergency zone. Call (480) 938-3803 for custom regional dispatch.`,
  };
}
