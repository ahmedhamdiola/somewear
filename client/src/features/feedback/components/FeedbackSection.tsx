
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Label } from "../../../components/ui/label"
import { Badge } from "../../../components/ui/badge"
import { Star } from "lucide-react"
import { useState } from "react"

interface FeedBackAttributes {
    name: string,
    rating: number,
    comment: string
}

const ProductPage = () => {
    const [reviews, setReviews] = useState<FeedBackAttributes[]>([
    ])
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState("5")

    const addReview = () => {
        if (!name.trim() || !comment.trim()) return
        setReviews([{ name, rating: Number(rating), comment }, ...reviews])
        setName("")
        setComment("")
        setRating("5")
    }

    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
                />
            ))}
        </div>
    )

    const ratingLabel: Record<number, string> = {
        5: 'Excellent',
        4: 'Good',
        3: 'Average',
        2: 'Poor',
        1: 'Terrible',
    }

    return (
        <div>
            <div className="px-10 pb-10 space-y-6">
                <h2 className="text-2xl font-semibold">Customer Feedback</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {reviews.map((review, i) => (
                        <Card key={i}>
                            <CardContent className="p-5 space-y-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="text-sm">
                                            {review.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="font-medium text-sm">{review.name}</p>
                                        <StarRating rating={review.rating} />
                                    </div>

                                    <Badge variant="secondary" className="ml-auto text-xs">
                                        {ratingLabel[review.rating]}
                                    </Badge>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {review.comment}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardContent className="p-6 space-y-4">

                        <div>
                            <Label className="mb-3 text-xl">Name</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="focus-visible:ring-0 focus-visible:ring-offset-0 h-12" />
                        </div>

                        <div>
                            <Label className="mb-3 text-xl">Comment</Label>
                            <Textarea
                                className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0 "
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your experience..."
                            />
                        </div>

                        <div>
                            <Label className="mb-3 text-xl">Rating</Label>
                            <Select value={rating} onValueChange={setRating}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    {[5, 4, 3, 2, 1].map(r => (
                                        <SelectItem key={r} value={String(r)}>
                                            <div className="flex items-center gap-2">
                                                <StarRating rating={r} />
                                                <span>{ratingLabel[r]}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-center items-center">

                            <Button onClick={addReview} className="cursor-pointer hover:shadow-lg h-12 text-xl font-bold rounded-xl w-2xl">
                                SUBMIT REVIEW
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ProductPage