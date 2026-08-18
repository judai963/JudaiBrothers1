import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Phone,
  MapPin,
  User,
  Mail,
  AlertTriangle,
  Flame,
  Waves,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Car
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FLAT_RATES_DATA } from '../data/flatRatesData';
import { checkZipCodeCoverage } from '../data/serviceAreasData';
import { FlatRateItem, BookingFormData } from '../types';

interface HousecallProBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  customQuote?: { title: string; price: number };
  highLegibilityMode: boolean;
}

export const HousecallProBookingModal: React.FC<HousecallProBookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  customQuote,
  highLegibilityMode,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || 'wh-01');
  const [urgency, setUrgency] = useState<'routine' | 'today' | 'emergency-now'>('routine');
  
  // Date & Saturday Picker
  const [selectedDate, setSelectedDate] = useState<string>('Saturday, Aug 15');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Morning (8:00 AM - 11:00 AM)');

  // Contact Info
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Phoenix');
  const [zip, setZip] = useState<string>('85018');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  if (!isOpen) return null;

  const currentService: FlatRateItem =
    FLAT_RATES_DATA.find((i) => i.id === selectedServiceId) || FLAT_RATES_DATA[0];

  const priceToDisplay = customQuote ? customQuote.price : currentService.price;
  const titleToDisplay = customQuote ? customQuote.title : currentService.title;

  const zipCheck = checkZipCodeCoverage(zip);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Submit Housecall Pro booking
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsConfirmed(true);
        const code = 'JB-HCP-' + Math.floor(100000 + Math.random() * 900000);
        setConfirmationCode(code);
        
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D97706', '#2563EB', '#10B981', '#F59E0B'],
          });
        } catch (e) {
          // ignore
        }
      }, 700);
    }
  };

  const timeSlots = [
    { label: 'Morning (8:00 AM - 11:00 AM)', tag: 'Popular' },
    { label: 'Mid-Day (11:00 AM - 2:00 PM)', tag: 'Fast' },
    { label: 'Afternoon (2:00 PM - 5:00 PM)', tag: 'Open' },
    { label: 'Evening Emergency (5:00 PM - 8:00 PM)', tag: '24/7 $0 Overtime' },
  ];

  const dateOptions = [
    { label: 'Saturday, Aug 15', sub: 'Saturday Slots Available', highlighted: true },
    { label: 'Sunday, Aug 16', sub: 'Weekend Service $0 Extra', highlighted: true },
    { label: 'Today (Emergency / Urgent)', sub: '30-45 Min Dispatch', highlighted: false },
    { label: 'Monday, Aug 17', sub: 'Weekday Slots Open', highlighted: false },
    { label: 'Tuesday, Aug 18', sub: 'Weekday Slots Open', highlighted: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Housecall Pro Top Bar */}
        <div className="bg-slate-950 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm text-white">Housecall Pro Online Dispatch</span>
                <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live System
                </span>
              </div>
              <div className="text-xs text-slate-400">Judai Brothers LLC • AZ ROC #354554</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Step Progress */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {!isConfirmed ? (
            <div>
              {/* Stepper Header */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= 1 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    1
                  </div>
                  <span className={`text-xs font-bold ${step === 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                    Service & Price
                  </span>
                </div>
                <div className="w-8 h-[2px] bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= 2 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    2
                  </div>
                  <span className={`text-xs font-bold ${step === 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                    Date & Time
                  </span>
                </div>
                <div className="w-8 h-[2px] bg-slate-200" />
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= 3 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    3
                  </div>
                  <span className={`text-xs font-bold ${step === 3 ? 'text-slate-900' : 'text-slate-400'}`}>
                    Address & Confirm
                  </span>
                </div>
              </div>

              {/* STEP 1: Select Service */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                        Selected Service
                      </div>
                      <div className="font-black text-slate-900 text-base sm:text-lg">
                        {titleToDisplay}
                      </div>
                      <div className="text-xs text-slate-600 flex items-center gap-2 mt-1">
                        <span>{currentService.timeEstimate}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">{currentService.warranty}</span>
                      </div>
                    </div>
                    <div className="text-right pl-3">
                      <div className="font-mono text-2xl font-black text-slate-900">
                        ${priceToDisplay.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold uppercase">$0 Trip Fee</div>
                    </div>
                  </div>

                  {/* Switch Service Dropdown / Quick Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Need a different service? Change selection:
                    </label>
                    <select
                      id="modal-service-select"
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    >
                      {FLAT_RATES_DATA.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.title} — ${item.price.toLocaleString()} ({item.categoryLabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Urgency Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select Scheduling Urgency
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setUrgency('routine')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          urgency === 'routine'
                            ? 'bg-slate-900 text-white border-slate-900 ring-1 ring-slate-900'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-xs">Standard Appointment</div>
                        <div className={`text-[11px] ${urgency === 'routine' ? 'text-slate-300' : 'text-slate-500'}`}>
                          Pick your preferred date/time
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setUrgency('today')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          urgency === 'today'
                            ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-xs">Same-Day Priority</div>
                        <div className={`text-[11px] ${urgency === 'today' ? 'text-slate-900' : 'text-slate-500'}`}>
                          Dispatch within 2-3 hours
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setUrgency('emergency-now')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          urgency === 'emergency-now'
                            ? 'bg-red-600 text-white border-red-600 font-bold ring-2 ring-red-400'
                            : 'bg-red-50 hover:bg-red-100 text-red-900 border-red-200'
                        }`}
                      >
                        <div className="font-bold text-xs text-red-100">24/7 Immediate Emergency</div>
                        <div className="text-[11px] text-red-200">
                          Active leak (30-45 min arrival)
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-3">
                    <button
                      id="step1-next-btn"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow transition-transform active:scale-95"
                    >
                      <span>Choose Date & Time</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Date & Time Picker */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select Date (Including Saturday Slots)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {dateOptions.map((opt, i) => {
                        const active = selectedDate === opt.label;
                        return (
                          <button
                            key={i}
                            id={`date-opt-${i}`}
                            type="button"
                            onClick={() => setSelectedDate(opt.label)}
                            className={`p-3.5 rounded-xl border text-left transition-all ${
                              active
                                ? 'bg-slate-900 text-white border-slate-900 ring-2 ring-amber-400'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm">{opt.label}</span>
                              {opt.highlighted && (
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                  active ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-900'
                                }`}>
                                  Weekend $0 Surcharge
                                </span>
                              )}
                            </div>
                            <div className={`text-xs mt-0.5 ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                              {opt.sub}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select Time Window
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {timeSlots.map((slot, i) => {
                        const active = selectedTimeSlot === slot.label;
                        return (
                          <button
                            key={i}
                            id={`time-slot-${i}`}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot.label)}
                            className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                              active
                                ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 ring-1 ring-amber-500 shadow-sm'
                                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-600" />
                              <span className="text-xs font-bold">{slot.label}</span>
                            </div>
                            <span className="text-[10px] text-slate-600 font-semibold">
                              {slot.tag}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      id="step2-next-btn"
                      onClick={() => setStep(3)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow transition-transform active:scale-95"
                    >
                      <span>Enter Contact & Address</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Address & Confirmation Form */}
              {step === 3 && (
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="booking-name"
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Marcus Sterling"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number (For SMS Tracking) *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="booking-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(480) 555-0199"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Street Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          id="booking-address"
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="10424 N Scottsdale Rd"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Valley ZIP Code *
                      </label>
                      <input
                        id="booking-zip"
                        type="text"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="85255"
                        maxLength={5}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono font-bold focus:ring-2 focus:ring-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Zip Code Status Feedback */}
                  {zip.length === 5 && (
                    <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                      zipCheck.covered ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{zipCheck.message}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Notes or Gate Codes (Optional)
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Gate code #1234, water heater is in the garage, dog is friendly."
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Summary Confirmation Banner */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                    <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Appointment Window:</span>
                      <strong className="text-amber-400">{selectedDate} • {selectedTimeSlot}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Total Binding Price ($0 Trip Fee):</span>
                      <span className="font-mono text-lg font-black text-white">${priceToDisplay.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      id="booking-submit-final-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-md transition-transform active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Connecting to Housecall Pro...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-slate-950" />
                          <span>Confirm Booking on Housecall Pro</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* BOOKING SUCCESS CONFIRMATION VIEW */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Appointment Confirmed on Housecall Pro
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 pt-2">
                  You’re All Set with Judai Brothers!
                </h3>
                <p className="text-xs text-slate-500">
                  Confirmation Ticket: <strong className="font-mono text-slate-900">{confirmationCode}</strong>
                </p>
              </div>

              {/* Dispatch Details Card */}
              <div className="max-w-md mx-auto bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{titleToDisplay}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Scheduled Time:</span>
                  <span className="font-bold text-amber-800">{selectedDate} ({selectedTimeSlot})</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Service Address:</span>
                  <span className="font-bold text-slate-900">{address || 'Your Phoenix Valley Home'}, {zip}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Binding Rate:</span>
                  <span className="font-mono font-black text-sm text-slate-900">${priceToDisplay.toLocaleString()} ($0 Trip Fee)</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                  <span>Assigned Plumber:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Jalal J. (Master Plumber • ROC #354554)
                  </span>
                </div>
              </div>

              {/* Live SMS & GPS Tracker Simulation */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900 text-white text-left flex items-start gap-3">
                <Car className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-amber-400">Live GPS Dispatch Active</div>
                  <div className="text-slate-300 text-[11px]">
                    We will send an SMS to <strong>{phone || 'your phone'}</strong> with live technician ETA and a direct link to track our truck on the map.
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow"
                >
                  Done & Close Window
                </button>
                <a
                  href="tel:4809383803"
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center gap-1.5 border border-slate-300"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Questions? Call (480) 938-3803</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
