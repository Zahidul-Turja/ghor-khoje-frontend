function Financial({
  activeTab,
  formData,
  handleInputChange,
  handleNumberInput,
}) {
  return (
    <div className={activeTab === "financial" ? "block" : "hidden"}>
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Rent per Month
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              name="rent_per_month"
              value={formData.rent_per_month}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-gray-300 p-3 pl-8 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Extra Bills
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              name="extra_bills"
              value={formData.extra_bills}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full rounded-lg border border-gray-300 p-3 pl-8 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Additional monthly costs (utilities, etc.)
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Prepayment Months
          </label>
          <input
            type="number"
            name="num_prepayment_months"
            value={formData.num_prepayment_months}
            onChange={handleNumberInput}
            min="0"
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <p className="mt-1 text-sm text-gray-500">
            Number of months required for advance payment
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="font-medium text-primary/70">Payment Summary</h3>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Rent:</span>
              <span className="font-medium">
                ${formData.rent_per_month.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Extra Bills:</span>
              <span className="font-medium">
                ${formData.extra_bills.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Monthly:</span>
              <span className="font-medium">
                ${(formData.rent_per_month + formData.extra_bills).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-primary/20 pt-2">
              <div className="flex justify-between">
                <span className="font-medium text-primary/90">
                  Required Prepayment:
                </span>
                <span className="font-bold text-primary/90">
                  $
                  {(
                    formData.num_prepayment_months *
                    (formData.rent_per_month + formData.extra_bills)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Financial;
