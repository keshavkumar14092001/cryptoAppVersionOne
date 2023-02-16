
import { Box, Image } from "@chakra-ui/react";
import React from "react";
import homeBG from "../assests/homeBG.jpg";

const Home = () => {
    return (
        <Box bgColor={"blackAlpha.900"} w={"full"} h={"92.2vh"}>
            <Image
                p={"16px"}
                w={"full"}
                h={"full"}
                objectFit={"cover"}
                src={homeBG}
                borderRadius={"20px"}
            />
        </Box>
    );
};

export default Home;