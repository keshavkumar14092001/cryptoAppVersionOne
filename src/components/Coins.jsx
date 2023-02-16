import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container, HStack, VStack, Image, Heading, Text, Button, RadioGroup, Radio, Flex } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { Link } from 'react-router-dom';

const Coins = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [currency, setCurrency] = useState("inr")

    const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

    const changePage = (pageNumber) => {
        setPage(pageNumber);
        setLoading(true);
    }

    const btns = new Array(132).fill(1);


    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const { data } = await axios.get(
                    `${server}/coins/markets?vs_currency=${currency}&page=${page}`
                );
                setCoins(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchCoins();
    }, [currency, page])

    if (error) return <ErrorComponent message={"Error while fetching response from API"} />

    return (
        <Container maxW={"container.xl"}>
            {
                loading ? <Loader /> : <>
                    <Flex justifyContent={"center"} alignItems={"center"}>
                        <RadioGroup value={currency} p={"8"} onChange={setCurrency}>
                            <HStack spacing={"4"}>
                                <Radio value="inr">INR</Radio>
                                <Radio value="eur">EUR</Radio>
                                <Radio value="usd">USD</Radio>
                            </HStack>
                        </RadioGroup>
                    </Flex>
                    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                        {
                            coins.map((coin) => (
                                <CoinCards
                                    key={coin.id}
                                    symbol={coin.symbol}
                                    img={coin.image}
                                    name={coin.name}
                                    rank={coin.market_cap_rank}
                                    id={coin.id}
                                    price={coin.current_price}
                                    currencySymbol={currencySymbol}
                                />
                            ))
                        }
                    </HStack>
                    <HStack w={"full"} overflow={"auto"} p={"8"}>
                        {
                            btns.map((btn, index) => (
                                <Button
                                    colorScheme={"purple"}
                                    variant={"outline"}
                                    onClick={() => changePage(index + 1)}
                                    key={index}
                                >
                                    {index + 1}
                                </Button>
                            ))
                        }
                    </HStack>
                </>
            }
        </Container>
    )
}

const CoinCards = ({ id, symbol, img, name, rank, price, currencySymbol }) => (
    <div>
        <Link to={`/coin/${id}`}>
            <VStack
                w={"52"}
                shadow={"lg"}
                p={"8"}
                borderRadius={"lg"}
                transition={"all 0.3s"}
                m={"4"}
                css={{
                    "&:hover": {
                        transform: "scale(1.1)"
                    }
                }}
            >
                <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchanges"} />
                <Heading size={"lg"} noOfLines={1}>{symbol}</Heading>
                <Heading size={"md"} noOfLines={1}>{rank}</Heading>
                <Text noOfLines={1}>{name}</Text>
                <Text noOfLines={1}>{price ? `${currencySymbol}${" "}${price}` : "NA"}</Text>
            </VStack>
        </Link>
    </div>
)

export default Coins;