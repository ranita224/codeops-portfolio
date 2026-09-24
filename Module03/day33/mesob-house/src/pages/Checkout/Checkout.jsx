import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { checkoutSchema, AREAS } from '../../checkout/checkoutSchema';
import { placeOrder } from '../../api/orders';
import Field from '../../components/Field/Field';

const DELIVERY_FEE = 100;

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalAmount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const navigate = useNavigate();

  const [serverError, setServerError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedName, setPlacedName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting, isSubmitted },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: { name: '', phone: '', area: 'Bole', notes: '' },
  });

  const grandTotal = totalAmount + DELIVERY_FEE;
  const errorCount = Object.keys(errors).length;

  function showError(field) {
    return (touchedFields[field] || isSubmitted) && !!errors[field];
  }

  async function onSubmit(data) {
    setServerError('');
    try {
      await placeOrder({ ...data, items, total: grandTotal });
      clearCart();
      setPlacedName(data.name);
      setOrderPlaced(true);
    } catch (err) {
      setServerError(err.message || 'Something went wrong placing your order. Please try again.');
    }
  }

  function onInvalid(formErrors) {
    const firstField = Object.keys(formErrors)[0];
    document.getElementById(firstField)?.focus();
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-amber-100">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order placed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you, {placedName}. Your order from Mesob House is on its way.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add something from the menu before checking out.</p>
        <Link
          to="/menu"
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Delivery Checkout</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-gray-700">
              <span>{item.name} × {item.quantity}</span>
              <span>{item.price * item.quantity} ETB</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between py-2 border-t border-gray-100 text-gray-600">
          <span>Subtotal</span>
          <span>{totalAmount} ETB</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-100 text-gray-600">
          <span>Delivery Fee</span>
          <span>{DELIVERY_FEE} ETB</span>
        </div>
        <div className="flex justify-between py-3 font-bold text-lg text-gray-900">
          <span>Total</span>
          <span>{grandTotal} ETB</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate className="bg-white p-8 rounded-xl shadow-md border border-amber-100">
        {isSubmitted && errorCount > 0 && (
          <div role="alert" className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-red-800 mb-2">
              Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'}:
            </p>
            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
              {Object.entries(errors).map(([field, err]) => (
                <li key={field}>
                  <a href={`#${field}`} className="underline">{err.message}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {serverError && (
          <p role="alert" className="mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {serverError}
          </p>
        )}

        <Field
          id="name"
          label="Full Name"
          error={errors.name?.message}
          showError={showError('name')}
          type="text"
          placeholder="Abebe Kebede"
          {...register('name')}
        />

        <Field
          id="phone"
          label="Phone Number (TeleBirr)"
          error={errors.phone?.message}
          showError={showError('phone')}
          type="tel"
          placeholder="0911234567 or +251911234567"
          {...register('phone')}
        />

        <Field
          id="area"
          label="Delivery Area"
          error={errors.area?.message}
          showError={showError('area')}
          as="select"
          {...register('area')}
        >
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </Field>

        <Field
          id="notes"
          label="Notes (optional)"
          error={errors.notes?.message}
          showError={showError('notes')}
          as="textarea"
          rows="3"
          placeholder="Ring the bell twice, leave at the gate, etc."
          {...register('notes')}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-700 hover:bg-amber-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors shadow-md mt-2"
        >
          {isSubmitting ? 'Sending your order…' : `Order — ${grandTotal} ETB`}
        </button>
      </form>
    </div>
  );
}