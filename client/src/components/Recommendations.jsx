import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "./Card";
const Container = styled.div`
  flex: 2;
`;
const Recommendations = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} vdo={video} />
      ))}
    </Container>
  );
};

export default Recommendations;
