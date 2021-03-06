import { Link } from "react-router-dom";

export type Props = {
  id: string;
  img: string;
  title: string;
  description: string;
};

export const Post = ({ id, img, title, description }: Props) => {
  return (
    <div style={{ marginTop: "2rem" }} className="col s12 m7">
      <div className="card horizontal">
        <div className="card-image">
          <img style={{ height: "15rem", width: "15rem" }} alt="post image" src={img} />
        </div>
        <div className="card-stacked">
          <h3 style={{ marginLeft: "1.8rem" }} className="header">
            {title}
          </h3>
          <div className="card-content">
            <p>{description}</p>
          </div>
          <div className="card-action">
            <Link to={`/posts/:${id}`}>Go to Post </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
