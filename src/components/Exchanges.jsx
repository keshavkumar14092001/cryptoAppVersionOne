import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponents from './ErrorComponent';

const Exchanges = () => {

    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchExchanges();
    }, [])

    if (error) return <ErrorComponents message={"Error while fetching response from API"} />

    return (
        <Container maxW={"container.xl"}>
            {
                loading ? <Loader /> : <>
                    <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                        {
                            exchanges.map((exchange) => (
                                <ExchangeCards
                                    key={exchange.id}
                                    url={exchange.url}
                                    img={exchange.image}
                                    name={exchange.name}
                                    rank={exchange.trust_score_rank}
                                />
                            ))
                        }
                    </HStack>
                </>
            }
        </Container>
    )
}

const ExchangeCards = ({ url, img, name, rank }) => (
    <div>
        <a href={url} target={"blank"}>
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
                <Heading size={"md"} noOfLines={1}>{rank}</Heading>
                <Text noOfLines={1}>{name}</Text>
            </VStack>
        </a>
    </div>
)

export default Exchanges;