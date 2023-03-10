import PageTitle from "../components/PageTitle";
import logo from "../assets/logo.png";

export default function About() {
  return (
    <div>
      <PageTitle title="About" />
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" className="w-1/4 m-4" />
        <h1 className="text-3xl font-bold">Know Your Neighborhood</h1>
        <p className="text-xl text-center max-w-2xl m-4">
          "Know Your Neighborhood" is a community-driven initiative that aims to
          bring people together and increase awareness about the local
          neighborhood. Our goal is to encourage residents to take an active
          interest in the place they call home, and to foster a sense of
          community pride and responsibility. Through various activities and
          events, we seek to promote a better understanding of the area's
          history, culture, and unique features. We believe that by learning
          about the neighborhood's past, present, and future, residents can gain
          a deeper appreciation for the community they live in and become more
          invested in its success. Whether it's through community clean-up
          efforts, local business partnerships, or educational workshops, "Know
          Your Neighborhood" strives to create a sense of unity among residents
          and to build a strong, vibrant community. We welcome anyone who shares
          our passion for community building and encourages all to get involved
          and make a positive difference in their neighborhood.
        </p>
      </div>
    </div>
  );
}
