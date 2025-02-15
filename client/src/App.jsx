

import React, { useState } from "react";
import QuotationForm from "./components/QuotationForm";
//import QuotationTable from "./components/QuotationTable";

function App() {
  const [items, setItems] = useState([
    { item: "", cantidad: "", descripcion: "", entrega: "", precioUnitario: "", precioTotal: "" },
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      { item: "", cantidad: "", descripcion: "", entrega: "", precioUnitario: "", precioTotal: "" },
    ]);
  };

  return (
    <div className="app-container">
      <QuotationForm />
      {/* <QuotationTable
        items={items}
        onItemChange={handleItemChange}
        onAddItem={handleAddItem}
      /> */}
    </div>
  );
}

export default App;
