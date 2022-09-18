import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  if (!videos) return <h1>Loading...</h1>;
  return (
    <Container>
      {videos.map((vdo) => (
        <Card key={vdo._id} vdo={vdo} />
      ))}
    </Container>
  );
};

export default Home;
