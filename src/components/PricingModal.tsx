import React, { useState } from 'react';
import {
  Sparkles,
  Check,
  CreditCard,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Copy
} from 'lucide-react';
import { NAIRA_SUBSCRIPTION_PLANS } from '../data/seedUsers';
import { SubscriptionPlan } from '../types';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lowDataMode: boolean;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  lowDataMode
}) => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  if (!isOpen) return null;

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (plan.priceNaira === 0) {
      alert('You are already on the Free Basic Tier!');
      return;
    }
    setSelectedPlan(plan);
    setPaymentSuccess(false);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1200);
  };

  const copyVirtualAccount = () => {
    navigator.clipboard.writeText('0123456789');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-900 text-sm font-bold p-2 cursor-pointer"
        >
          ✕
        </button>

        {!selectedPlan ? (
          /* Step 1: Plan Selection */
          <div>
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Naira-Friendly School Subscriptions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Transparent Pricing for Nigerian Educators & Schools
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Empower your teachers and students with 100% NERDC curriculum lesson notes, scheme of work generators, and WAEC CBT simulators.
              </p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {NAIRA_SUBSCRIPTION_PLANS.map(plan => (
                <div
                  key={plan.id}
                  className={`rounded-3xl p-6 border transition-all flex flex-col justify-between relative ${
                    plan.popular
                      ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/30 shadow-lg'
                      : 'border-slate-200 bg-white shadow-xs hover:border-slate-300'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider">
                      Most Popular for Teachers
                    </span>
                  )}

                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{plan.name}</h3>
                    <p className="text-[11px] text-slate-500 mb-4">{plan.recommendedFor}</p>

                    <div className="mb-6">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-black text-slate-900">
                          {plan.priceNaira === 0 ? 'Free' : `₦${plan.priceNaira.toLocaleString()}`}
                        </span>
                        {plan.priceNaira > 0 && (
                          <span className="text-xs text-slate-500 font-medium">
                            /{plan.billingCycle === 'monthly' ? 'month' : 'term'}
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                      plan.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : plan.priceNaira === 0
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {plan.priceNaira === 0 ? 'Current Free Plan' : `Subscribe (${plan.name})`}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center text-[11px] text-slate-400">
              Payments processed securely via Nigerian Gateway • Instant activation on payment confirmation.
            </div>
          </div>
        ) : (
          /* Step 2: Checkout / Payment Simulation */
          <div className="max-w-lg mx-auto">
            {!paymentSuccess ? (
              <div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 mb-4 inline-block"
                >
                  ← Back to Plans
                </button>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Selected Plan</span>
                    <h3 className="text-sm font-bold text-slate-900">{selectedPlan.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-emerald-700">
                      ₦{selectedPlan.priceNaira.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 block">per {selectedPlan.billingCycle}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <label className="text-xs font-bold text-slate-700 block mb-2">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center space-y-1 cursor-pointer transition-colors ${
                        paymentMethod === 'card'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <span>Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center space-y-1 cursor-pointer transition-colors ${
                        paymentMethod === 'transfer'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Building className="w-4 h-4 text-emerald-600" />
                      <span>Bank Transfer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('ussd')}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center space-y-1 cursor-pointer transition-colors ${
                        paymentMethod === 'ussd'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>USSD Code</span>
                    </button>
                  </div>
                </div>

                {/* Form based on method */}
                <form onSubmit={handleSimulatePayment} className="space-y-4 text-xs">
                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Card Number (Mastercard / Visa / Verve)</label>
                        <input
                          type="text"
                          required
                          placeholder="5399 •••• •••• 1234"
                          defaultValue="5399 4100 8921 7843"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Expiry Date</label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            defaultValue="12/28"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">CVV / CVV2</label>
                          <input
                            type="password"
                            required
                            maxLength={3}
                            placeholder="123"
                            defaultValue="982"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'transfer' && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <p className="font-bold text-slate-800">Paystack / Wema Virtual Account:</p>
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
                        <span className="font-bold text-slate-900">0123456789</span>
                        <button
                          type="button"
                          onClick={copyVirtualAccount}
                          className="text-xs text-emerald-700 font-bold hover:underline flex items-center space-x-1"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedAccount ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Bank: <strong>Wema Bank / NaijaEdu Pay</strong> • Beneficiary: <strong>NaijaEdu Curricula Ltd</strong>
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'ussd' && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
                      <p className="font-bold text-slate-800">Dial USSD String from your registered phone:</p>
                      <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm font-bold text-emerald-800">
                        *737*000*2492#
                      </div>
                      <p className="text-[11px] text-slate-500">Supported on GTBank, Zenith, Access, UBA, FirstBank.</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {isProcessing ? 'Processing Transaction...' : `Pay ₦${selectedPlan.priceNaira.toLocaleString()}`}
                    </span>
                  </button>
                </form>
              </div>
            ) : (
              /* Success confirmation */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Subscription Activated!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your <strong>{selectedPlan.name}</strong> is now live. Unlimited PDF downloads, 12-week Schemes of Work, and offline features are unlocked.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                >
                  Start Exploring Premium
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
