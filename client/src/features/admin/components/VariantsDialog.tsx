import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { toast } from "react-toastify";
import {
  getProductVariants,
  updateProductVariant,
  addProductVariant,
  type ProductVariant,
} from "../services/variants";

const SIZES = [ "M", "L", "XL", "XXL"];

type VariantEntry = {
  id?: number;
  stock: number;
  inputStock: number;
};

interface Props {
  productId: number | null;
  productName: string;
  onClose: () => void;
}

const VariantsDialog = ({ productId, productName, onClose }: Props) => {
  const [variantMap, setVariantMap] = useState<Record<string, VariantEntry>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;
    const load = async () => {
      try {
        const data = await getProductVariants(productId);
        // build map from existing variants
        const map: typeof variantMap = {};
        SIZES.forEach((s) => {
          const found = data.find((v: ProductVariant) => v.size === s);
          map[s] = found
            ? { id: found.id, stock: found.stock, inputStock: found.stock }
            : { stock: 0, inputStock: 0 };
        }); 
        setVariantMap(map);
      } catch {
        toast.error("Failed to load variants");
      }
    };
    load();
  }, [productId]);

  const handleSave = async (size: string) => {
    const entry = variantMap[size];
    setLoading(true);
    try {
      if (entry.id) {
        // variant exists → update
        await updateProductVariant(entry.id, entry.inputStock);
        setVariantMap((prev) => ({
          ...prev,
          [size]: { ...prev[size], stock: entry.inputStock },
        }));
        toast.success(`${size} stock updated`);
      } else {
        // variant doesn't exist → add only if stock > 0
        if (entry.inputStock <= 0) {
          toast.error("Stock must be > 0 to add a new size");
          return;
        }
        const created = await addProductVariant({
          productId: productId!,
          size,
          stock: entry.inputStock,
        });
        setVariantMap((prev) => ({
          ...prev,
          [size]: {
            id: created.id,
            stock: created.stock,
            inputStock: created.stock,
          },
        }));
        toast.success(`${size} added!`);
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!productId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Variants — {productName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {SIZES.map((size) => {
            const entry = variantMap[size];
            const inDb = !!entry?.id;
            return (
              <div key={size} className="flex items-center gap-3">
                {/* size badge */}
                <span
                  className={`w-12 text-sm font-bold ${
                    inDb ? "text-black" : "text-gray-400"
                  }`}
                >
                  {size}
                </span>

                {/* stock input */}
                <Input
                  type="number"
                  min={0}
                  value={entry?.inputStock ?? 0}
                  onChange={(e) =>
                    setVariantMap((prev) => ({
                      ...prev,
                      [size]: {
                        ...prev[size],
                        inputStock: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-20"
                />

                {/* status label */}
                <span className="text-xs flex-1 text-gray-400">
                  {inDb ? `in stock` : "not added"}
                </span>

                {/* action button */}
                <Button
                  size="sm"
                  disabled={loading}
                  variant={inDb ? "outline" : "default"}
                  onClick={() => handleSave(size)}
                >
                  {inDb ? "Save" : "Add"}
                </Button>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VariantsDialog;
