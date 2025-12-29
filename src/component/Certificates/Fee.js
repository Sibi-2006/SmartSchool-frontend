import React from "react";

export default function Fee({
  certificate,
  student,
  appName,
  saveAsPDF,
  pdfRef
}) {
  return (
    <div className="min-h-screen bg-gray-100 p-6 py-28">

      {/* Certificate */}
      <div
        ref={pdfRef}
        className="max-w-4xl mx-auto bg-white border-2 border-black p-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-wide">
            FEE CERTIFICATE
          </h1>
          <p className="mt-2 text-sm">
            (Issued by the "{appName}" Institution)
          </p>
        </div>

        {/* Body */}
        <div className="text-lg leading-8 text-justify">
          <p>
            This is to certify that{" "}
            <span className="font-semibold">{student.fullName}</span>, bearing
            Roll Number{" "}
            <span className="font-semibold">{student.rollNumber}</span>, studying
            in{" "}
            <span className="font-semibold">
              Standard {student.standard} – Section {student.section}
            </span>
            , has paid the following fees to the institution.
          </p>

          {/* Fee Table */}
          <div className="mt-6 border border-black">
            <table className="w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b border-black">
                  <td className="p-3 font-medium">Total Fees</td>
                  <td className="p-3">₹ {student.totalFees}</td>
                </tr>
                <tr className="border-b border-black">
                  <td className="p-3 font-medium">Amount Paid</td>
                  <td className="p-3">₹ {student.amountPaid}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Balance Amount</td>
                  <td className="p-3">₹ {student.balance}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-6">
            This certificate is issued for the purpose of{" "}
            <span className="font-semibold">{certificate.reason}</span>.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-16">
          <div>
            <p className="text-sm">
              Date:{" "}
              {certificate.createdAt &&
                new Date(certificate.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="text-center">
            <div className="border-t border-black w-48 mx-auto mb-2"></div>
            <p className="font-semibold">Accountant / Principal</p>
            <p className="text-sm">Authorized Signature</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={saveAsPDF}
          className="bg-emerald-600 text-white px-8 py-2 rounded shadow hover:bg-emerald-700 transition"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}
