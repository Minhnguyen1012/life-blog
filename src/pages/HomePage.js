import React, { useState, useEffect } from "react";
import { Button, Card, Container, CardDeck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import { ClipLoader } from "react-spinners";
import PaginationBar from "../components/PaginationBar";
import moment from "moment";

const HomePage = () => {
  const blogs = useSelector((state) => state.blog.blogs);
  const totalPageNum = useSelector((state) => state.blog.totalPageNum);
  const loading = useSelector((state) => state.blog.loading);

  const [pageNum, setPageNum] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(blogActions.blogsRequest(pageNum));
  }, [dispatch, pageNum]);

  return (
    <Container>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPageNum}
      ></PaginationBar>
      {loading ? (
        <div className="text-center">
          <ClipLoader color="red" size={150} loading={true} />
        </div>
      ) : (
        <>
          {blogs.length > 0 ? (
            <CardDeck>
              {blogs.map((blog) => (
                <Card
                  className=" mt-5 d-flex flex-wrapped"
                  style={{ width: "200px", flex: "0 0 auto", height: "200px" }}
                >
                  {blog.images?.length > 0 && (
                    <Card.Img variant="top" src={blog.images[0]} />
                  )}
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    {/* <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text> */}
                    {/* <Button variant="primary">Go somewhere</Button> */}
                    <Card.Footer
                      className="text-muted"
                      style={{ fontSize: "10px" }}
                    >
                      @{blog.author.name} {moment().startOf("hour").fromNow()}
                    </Card.Footer>
                  </Card.Body>{" "}
                </Card>
              ))}
            </CardDeck>
          ) : (
            <p>There are no blogs</p>
          )}
        </>
      )}
    </Container>
  );
};

export default HomePage;
