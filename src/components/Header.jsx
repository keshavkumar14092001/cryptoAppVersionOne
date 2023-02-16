import { Button, HStack } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <HStack bgColor={"blackAlpha.900"} shadow={"base"} p={"4"} justifyContent={["center", "flex-start"]}>
            <Button colorScheme={"purple"} variant={"outline"}>
                <Link to={"/"}>Home</Link>
            </Button>
            <Button colorScheme={"purple"} variant={"outline"}>
                <Link to={"/exchanges"}>Exchanges</Link>
            </Button>
            <Button colorScheme={"purple"} variant={"outline"}>
                <Link to={"/coins"}>Coins</Link>
            </Button>
        </HStack>
    )
}

export default Header;