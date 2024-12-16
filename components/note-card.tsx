import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

type Props = {};

export default function NoteCard({}: Props) {
  return (
    <Card className="rounded-3xl  border-none my-2">
      <CardHeader>
        <CardTitle>Name</CardTitle>
        <span>username</span>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className=" line-clamp-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam facilis
        eum nostrum sunt voluptas quas nam odio beatae earum explicabo,
        voluptatem, cupiditate eveniet quibusdam neque ad labore iste!
        Blanditiis, beatae.
      </CardContent>
      <CardFooter className="mt-2 ">
        {["reaction", "comment"].map((i, j) => (
          <p key={j} className="mr-2">{i}</p>
        ))}
      </CardFooter>
    </Card>
  );
}
