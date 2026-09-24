import { useEvents } from "../../contexts/EventContext";

const inputBase =
  "w-full bg-[#1A1A1A] text-[#ABABAB] text-[16px] rounded-[30px] border-2 border-[#262525] px-4.5 py-5 placeholder:text-[#6E6E6E] outline-none focus:border-[#995DFF] transition-colors";

const labelBase = "text-[#FFFFFF] text-[16px] font-normal";

const requiredMark = <span className="text-[#FF7466]">*</span>;

const TicketForm = () => {
  const { createTickets, setCreateTickets } = useEvents();

  const nextId = () => {
    if (createTickets.length === 0) {
      return 1;
    }

    return Math.max(...createTickets.map((ticket) => ticket.id)) + 1;
  };

  const handleChange = (
    id: number,
    field: "name" | "price" | "quantity",
    value: string,
  ) => {
    setCreateTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id !== id) {
          return ticket;
        }

        if (field === "name") {
          return {
            ...ticket,
            name: value,
          };
        }

        const numericValue = Number(value);

        return {
          ...ticket,
          [field]: Number.isNaN(numericValue) ? 0 : numericValue,
        };
      }),
    );
  };

  const addTicket = () => {
    setCreateTickets((prev) => [
      ...prev,
      {
        id: nextId(),
        name: "",
        price: 0,
        quantity: 0,
      },
    ]);
  };

  const removeTicket = (id: number) => {
    setCreateTickets((prev) => {
      if (prev.length <= 1) {
        return prev;
      }

      return prev.filter((ticket) => ticket.id !== id);
    });
  };

  return (
    <div className="flex flex-col gap-5 bg-[#0F0F0F] border border-[#262525] rounded-[30px] p-5.5">
      <h3 className="text-white text-[18px] font-semibold">Ticket Overview</h3>

      <p className="text-[#777777] text-[14px]">
        Add the ticket types you want to sell for this event.
      </p>

      {createTickets.map((ticket, index) => (
        <div
          key={ticket.id}
          className="flex flex-col gap-5 bg-[#141414] border border-[#262525] rounded-[25px] p-5"
        >
          {/* TICKET HEADER */}
          <div className="flex items-center justify-between">
            <h4 className="text-white text-[17px] font-medium">
              Ticket {index + 1}
            </h4>

            {createTickets.length > 1 && (
              <button
                type="button"
                onClick={() => removeTicket(ticket.id)}
                className="text-[#FF7466] text-[14px] hover:text-[#FF8A80] transition-colors"
              >
                Remove
              </button>
            )}
          </div>

          {/* TICKET NAME */}
          <div className="flex flex-col gap-2.5">
            <label className={labelBase}>Ticket Name {requiredMark}</label>

            <input
              type="text"
              value={ticket.name}
              onChange={(e) => handleChange(ticket.id, "name", e.target.value)}
              placeholder="e.g. Regular"
              className={inputBase}
            />
          </div>

          {/* PRICE + QUANTITY */}
          <div className="grid grid-cols-2 gap-4">
            {/* PRICE */}
            <div className="flex flex-col gap-2.5">
              <label className={labelBase}>Ticket Price {requiredMark}</label>

              <input
                type="number"
                min="0"
                value={ticket.price}
                onChange={(e) =>
                  handleChange(ticket.id, "price", e.target.value)
                }
                placeholder="Enter 0 for free"
                className={inputBase}
              />
            </div>

            {/* QUANTITY */}
            <div className="flex flex-col gap-2.5">
              <label className={labelBase}>Quantity {requiredMark}</label>

              <input
                type="number"
                min="1"
                value={ticket.quantity || ""}
                onChange={(e) =>
                  handleChange(ticket.id, "quantity", e.target.value)
                }
                placeholder="e.g. 100"
                className={inputBase}
              />
            </div>
          </div>
        </div>
      ))}

      {/* ADD ANOTHER TICKET */}
      <button
        type="button"
        onClick={addTicket}
        className="w-full h-[58px] rounded-[30px] border-2 border-[#262525] bg-[#1A1A1A] text-[#FFFFFF] text-[15px] hover:border-[#995DFF] hover:text-[#995DFF] transition-colors"
      >
        + Add Another Ticket
      </button>
    </div>
  );
};

export default TicketForm;
