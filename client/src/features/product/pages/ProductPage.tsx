import FooterBar from "../../common/components/FooterBar"
import NavBar from "../../common/components/navbar/NavBar"
import FeedbackSection from "../../feedback/components/FeedbackSection"
import { toast } from 'react-toastify';
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/toggle-group"
import SizeSpecsHoodies from "../../../assets/sizeSpecs_Hoodies.png"
import SizeSpecsPants from "../../../assets/sizeSpecs_Pants.png"
import { useState } from "react"
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";

const ProductPage = () => {
    const [size, setSize] = useState("")
    //////////////////////////////////////
    const categoryPants = false
    //////////////////////////////////////

    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    return (
        <div className="min-h-screen ">
            <NavBar />
            {error && <p>{error}</p>}
            {loading && <p>{loading}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 animate-[fadeInUp_0.8s_ease-out_forwards]">
                {/* IMAGE */}
                <Card className="bg-transparent border-none">
                    <CardContent className="p-0">
                        <img src={product?.imageUrl} className="w-full rounded-xl" />
                    </CardContent>
                </Card>
                {/* INFO */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-bold">{product?.name}
                    </h1>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                        {product?.description}
                    </p>
                    {/* SIZE */}
                    <div>
                        <p className="mb-3 text-sm text-muted-foreground">Size</p>

                        <ToggleGroup
                            type="single"
                            value={size}
                            onValueChange={setSize}
                            className="flex gap-2"
                            defaultValue="all"
                        >
                            {["M", "L", "XL", "XXL"].map((s) => (
                                <ToggleGroupItem
                                    key={s}
                                    value={s}
                                    className="border px-4 py-2"
                                >
                                    {s}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>
                    <div className="flex justify-center items-center flex-col">

                        <Button
                            className="mt-4 h-12 text-xl font-bold rounded-xl w-xl cursor-pointer hover:shadow-lg bg-black hover:bg-[#0f0616]"
                            disabled={!size}
                            onClick={() => {
                                if (!size) return
                                toast.success("Added to cart!")
                                setSize("")
                            }}
                        >
                            ADD TO CART
                        </Button>

                        <Button
                            className="mt-4 h-12 text-xl font-bold rounded-xl w-xl bg-white text-black border-black cursor-pointer hover:shadow-lg"
                            disabled={!size}
                            onClick={() => {
                                if (!size) return
                                setSize("")
                            }}
                        >
                            BUY IT NOW
                        </Button>
                    </div>
                    {/* PRICE */}
                    <p className="text-3xl font-semibold">${product?.price}</p>
                    <img src={categoryPants ? SizeSpecsPants : SizeSpecsHoodies} />
                </div>
            </div>

            <FeedbackSection />

            <FooterBar />
        </div>
    )
}

export default ProductPage