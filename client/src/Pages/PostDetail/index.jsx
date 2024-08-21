import React from "react";
import Navigation from "../../components/Nav";

const PostDetail = () => {
  return (
    <div className="h-screen">
      <Navigation />
      <div className="w-5/6 m-auto border-2 border-black h-3/4 p-7  overflow-y-auto">
        <div className="w-full flex flex-wrap justify-between gap-4 ">
          <div>
            <div className="flex flex-col mb-2">
              <p className=" text-2xl font-bold">Author:</p>
              <p className="text-xl font-semibold">Lorem</p>
            </div>
            <div className="flex flex-col mb-2">
              <p className=" text-2xl font-bold">Title:</p>
              <p className="text-xl font-semibold">Lorem</p>
            </div>
            <div className="flex flex-col mb-2">
              <p className=" text-2xl font-bold">Description:</p>
              <p className="text-xl font-semibold">Lorem</p>
            </div>
            <div className="flex flex-col mb-2">
              <p className=" text-2xl font-bold">Content:</p>
              <p className="text-xl font-sans font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                cupiditate labore aperiam voluptatum accusamus, quis cum
                blanditiis? Architecto nulla neque blanditiis quia nobis quidem?

                Deleniti consequuntur praesentium excepturi odio porro dolores
                hic voluptates, earum iste blanditiis consectetur. Illum at
                molestiae ipsa quod quis illo voluptatem, culpa magnam sint
                cupiditate? At voluptatibus consectetur dolores magnam est
                tenetur odit et temporibus fugit accusamus, quisquam placeat
                doloribus pariatur provident excepturi sequi voluptatem
                quibusdam dolor aspernatur quas quam! Magnam facilis rem ipsam
                eaque. Omnis veniam fuga rerum quibusdam voluptates? Velit eos
                inventore ad assumenda dolorem eveniet repellat quia accusamus
                magnam voluptatibus tenetur non, recusandae aspernatur. Totam,
                ad. Provident eveniet aliquid consectetur temporibus modi alias
                voluptatem totam rem tempora in. Nostrum officia, error veniam
                eveniet earum ipsum cum porro eligendi voluptatum consequatur
                ratione non? Quos voluptatem itaque quo autem, sint sapiente
                quidem! Dolor quo perferendis assumenda eaque dolore, eveniet
                illum! Eius minus fugiat nesciunt similique quia ullam facere
                cupiditate tempore totam! Rerum sequi laborum eaque! Quod, omnis
                et alias, sed excepturi maiores aspernatur saepe eos tempore
                quaerat enim, reiciendis nisi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
