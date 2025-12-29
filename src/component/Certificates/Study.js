import React from "react";

export default function Study({
  certificate,
  student,
  appName,
  saveAsPDF,
  pdfRef
}) {
  return (
    <div className="min-h-screen bg-gray-100 p-6 py-28">

      <div
        ref={pdfRef}
        className="max-w-4xl mx-auto bg-white border-2 border-black p-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-wide">
            STUDY CERTIFICATE
          </h1>
          <p className="mt-2 text-sm">
            (Issued by the "{appName}" Institution)
          </p>
        </div>

        {/* Body */}
        <div className="text-lg leading-8 text-justify">
          <p>
            This is to certify that{" "}
            <span className="font-semibold">{student.fullName}</span> is
            currently studying in{" "}
            <span className="font-semibold">
              Standard {student.standard} – Section {student.section}
            </span>{" "}
            for the academic year.
          </p>

          <p className="mt-4">
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
            <p className="font-semibold">Principal / Head</p>
            <p className="text-sm">Authorized Signature</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={saveAsPDF}
          className="bg-green-600 text-white px-8 py-2 rounded shadow hover:bg-green-700"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}
