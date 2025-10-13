export function Hours() {
  const hours = [
    { day: "Monday", time: "3:00 PM – 10:00 PM" },
    { day: "Tuesday", time: "Closed" },
    { day: "Wednesday", time: "Closed" },
    { day: "Thursday", time: "3:00 PM – 10:00 PM" },
    { day: "Friday", time: "3:00 PM – 11:00 PM" },
    { day: "Saturday", time: "11:00 AM – 11:00 PM" },
    { day: "Sunday", time: "10:00 AM – 2:00 PM" },
  ]

  return (
    <section id="hours" className="py-24 bg-[#063B29]">
      <div className="container mx-auto px-6">
        <h2
          className="text-5xl md:text-6xl font-light mb-16 text-[#FDF8F0] text-center"
          style={{ fontFamily: "'Cormorant', serif" }}
        >
          Hours of Operation
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#FDF8F0]/5 backdrop-blur-sm border border-[#AF911C]/30 rounded-sm overflow-hidden">
            {hours.map((item, index) => (
              <div
                key={item.day}
                className={`flex justify-between items-center px-8 py-6 ${
                  index !== hours.length - 1 ? "border-b border-[#3C6D5D]/30" : ""
                } ${item.time === "Closed" ? "opacity-50" : ""}`}
              >
                <span className="text-lg font-medium text-[#FDF8F0] tracking-wide">{item.day}</span>
                <span className="text-lg text-[#AF911C]">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
