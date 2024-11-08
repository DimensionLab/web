export default function Stats() {
  const data = [
    ["85%+ ", "costs saved"],
    ['10,000+ ', "hours saved"],
    ["2,100+ ", "users"]
  ]
  return (
    <section className="flex flex-row w-full justify-center px-4 gap-x-2 sm:justify-between"> 
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center px-2">
          <div className="text-2xl font-black sm:text-5xl">{d[0]}</div>
          <div className="text-sm text-center text-gray-400 sm:text-2xl">{d[1]}</div>
        </div>
      ))}
    </section>
  )
}
