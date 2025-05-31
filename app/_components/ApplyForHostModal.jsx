function ApplyForHostModal({ handleHostSubmission, setShowModal }) {
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      setShowModal(false);
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-bold">Apply for Host</h2>
        <p>Are you sure you want to apply for host?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            className="cursor-pointer rounded-lg border-2 border-gray-600 px-5 py-1 text-sm font-semibold text-gray-600"
            onClick={() => setShowModal(false)}
          >
            No
          </button>
          <button
            className="cursor-pointer rounded-lg border-2 bg-primary px-5 py-1 text-sm font-semibold text-white"
            onClick={handleHostSubmission}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyForHostModal;
