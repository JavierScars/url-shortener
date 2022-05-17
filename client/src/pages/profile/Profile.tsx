import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Header } from "../../components/Header/Header";
import { useState, useEffect, FC } from "react";
import { LoadingSpinner } from "../../components/Spinner/Spinner";
import { CopyIcon } from '@chakra-ui/icons'
import { getAllUrls } from "../../services/urlShortener";
import { IShortenURL } from "../../interfaces/IUrl";
import { useToast } from "../../services/useToast";

const TABLE_HEADERS = ['Original URL', 'Short URL', 'Actions', 'Visit Counter']

enum LOADING_STATE {
    LOADING,
    LOADED,
    ERROR
}

interface IURLsTable {
    urls: IShortenURL[],
    copyUrl: (url: string) => void,
}
const URLsTable: FC<IURLsTable> = ({ urls, copyUrl }) => {

    return <TableContainer>
        <Table size='sm' data-testid="urls-table">
            <Thead>
                <Tr data-testid="urls-table-headers">
                    {TABLE_HEADERS.map(header => <Th key={header}>{header}</Th>)}
                </Tr>
            </Thead>
            <Tbody>
                {urls.map(url =>
                    <Tr key={url.id}>
                        <Td data-testid="row-original-url">{url.url}</Td>
                        <Td data-testid="row-shorten-url">{url.customCode || url.shortenUrl}</Td>
                        <Td>
                            <CopyIcon w='1.5rem' h="1.5rem" onClick={() => copyUrl(url.shortenUrl)} />
                        </Td>
                        <Td>{url.visitCount}</Td>
                    </Tr>
                )}
            </Tbody>
        </Table>
    </TableContainer>
}

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(LOADING_STATE.LOADING);
    const [urls, setUrls] = useState<IShortenURL[]>([]);
    const toast = useToast();

    useEffect(() => {
        (async () => {
            try {
                const _urls = await getAllUrls()
                if (_urls) {
                    setUrls(_urls);
                    setIsLoading(LOADING_STATE.LOADED);
                }
            } catch (error) {
                setIsLoading(LOADING_STATE.ERROR);
                toast({
                    title: 'Error',
                    description: 'Something went wrong retrieving urls',
                    status: 'error',
                    duration: 5000,
                    position: 'bottom'
                })
            }
        })()
    }, [])

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast({
            title: 'Copied to clipboard',
            description: 'You can now paste the URL in your browser',
            status: 'info',
            duration: 5000,
            isClosable: true,
            position: 'bottom'

        });
    }

    return (
        <Box display="flex" flexDir="column" minH="100vh">
            <Header showLoginButton />
            <Box as="main" flex="1" flexGrow={1} justifyContent="center" margin="auto" alignItems="center" display="flex" flexDir="column" marginTop="4rem" maxW="min(100vw, 800px)" overflow="auto">
                <LoadingSpinner isLoading={isLoading === LOADING_STATE.LOADING} />
                {isLoading === LOADING_STATE.LOADED && <URLsTable urls={urls} copyUrl={handleCopyUrl} />}
                {isLoading === LOADING_STATE.ERROR && <><Box fontSize="2.5rem" color="red.500" fontWeight="bold">UPS!</Box> <Box fontSize="1.5rem" textAlign="center">Something went wrong<br />Try reloading the site</Box></>}
            </Box>
        </Box>
    );
}
