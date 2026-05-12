import { useState } from "react"
import SizeSpecsHoodies from "../../../assets/sizeSpecs_Hoodies.png"
import SizeSpecsPants from "../../../assets/sizeSpecs_Pants.png"

type Guide = {
    title: string
    img: string
}

const guides: Guide[] = [
    {
        title: "Pants Size Guide",
        img: SizeSpecsPants,
    },
    {
        title: "Shirts Size Guide",
        img: SizeSpecsHoodies,
    },
]

const SizeGuide = () => {
    const [page, setPage] = useState(0)

    return (
        <div className="mt-10 flex flex-col items-center gap-6">

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md overflow-hidden">

                <div className="p-4 border-b text-center">
                    <h2 className="text-lg font-bold">
                        {guides[page].title}
                    </h2>
                </div>

                <div className="p-6 flex justify-center">
                    <img
                        src={guides[page].img}
                        className="w-full max-w-md object-contain"
                    />
                </div>
            </div>

            <div className="flex gap-3">
                {guides.map((g, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index)}
                        className={`px-4 py-2 rounded-lg border transition ${page === index
                            ? "bg-black text-white"
                            : "bg-white"
                            }`}
                    >
                        {g.title.split(" ")[0]}
                    </button>
                ))}
            </div>

        </div>
    )
}

export default SizeGuide