import { useContext, useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { AuthContext } from "../../context/Auth";
import { useHttp, useMessage, useSetTextFieldsActive } from "../../hooks";
import { Post } from "./Post";

type Posts = {
  id: string;
  img: string;
  title: string;
  description: string;
}[];

export const PostsList = () => {
  useSetTextFieldsActive();
  const { token } = useContext(AuthContext);
  const message = useMessage();
  const { error, loading, removeError, request } = useHttp();
  const [posts, setPosts] = useState<Posts[] | undefined>(undefined);

  useEffect(() => {
    if (error) {
      message(error);
      removeError();
    }
  }, [error, message, removeError]);

  const getHandler = async () => {
    try {
      const response = await request({ url: "/posts", method: "GET", token: token as string });
      const parsedPosts = response.map(({ img, title, description, _id }: any) => ({
        img: img
          ? img
          : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=",
        title,
        description,
        id: _id,
      }));
      setPosts(parsedPosts);
    } catch (error) {}
  };

  useEffect(() => {
    getHandler();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <>Something went wrong. Please reload the page</>;
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      {
        //@ts-expect-error
        posts?.map(({ id, img, title, description }: Posts) => (
          <Post description={description} title={title} img={img} id={id} key={id} />
        ))
      }
    </div>
  );
};
