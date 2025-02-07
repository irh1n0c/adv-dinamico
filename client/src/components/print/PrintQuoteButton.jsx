import React from 'react';

const PrintQuoteButton = ({ quoteData }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button 
      onClick={handlePrint} 
      className="font-Ubuntu text-center bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white py-2 px-4 rounded-md transition-colors duration-300 print:hidden text-base sm:text-sm sm:py-1 sm:px-3">
      Imprimir Cotización, no olvide guardarlo antes.
    </button>
  );
};

export default PrintQuoteButton;