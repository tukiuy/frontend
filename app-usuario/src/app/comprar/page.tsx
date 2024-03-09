import { TItem } from "@/types/items";
import SearchBar from "../../components/SearchBar";
import Item from "../../components/Item";
import getUserData from "@/functions/getUserData";
import client from "@/functions/redisClient";
import ContextComponent from "@/components/CartItemsContext";
import { CreditCardIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import LinkButton from "@/components/LinkButton";
import getOrders from "@/functions/getOrders";

const cacheIsInitialized = (cache: any): boolean => {
  if (cache === null || cache === undefined) return false;
  return Object.keys(cache).includes("cart"); 
}

const consolidateData = (eventItems: TItem[], cartItems: TItem[]): TItem[] => {
  return eventItems.map(x => {
    const cartItem = cartItems.find(y => y.id === x.id);
    return cartItem === undefined ? { ...x, quantity: 0 } : cartItem;
  })
}

const initializeCache = async (device: string, user: string) => {
  const cache = {
    cart: [] as TItem[],
    user: ""
  }
  await client.json.set(device, "$", cache);
}
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const searchQuery = searchParams?.search as string || "";
  const [device, user] = await getUserData();
  const cache = await client.json.get(device);
  const isCacheAvailable = cacheIsInitialized(cache);
  if (!isCacheAvailable) await initializeCache(device, user);
  const eventItems = await client.json.get(`articulos:${process.env.ID_EVENTO as any * 1}`) as TItem[];
  const cart = isCacheAvailable ? cache.cart as TItem[] : [] as TItem[];
  const items = consolidateData(eventItems, cart);
  const cartNotEmpty = cart.length > 0;
  const totalCartItems = cartNotEmpty ? cart.map(x => x.quantity).reduce((prev, curr) => prev + curr) : 0;
  const orders = await getOrders(device, user);
 
  return (
    <>
      <ContextComponent amount={totalCartItems} orders={orders.length} />
      <main className="w-[88vw] pt-6 flex flex-row mx-auto flex-wrap justify-between box-content content-start h-max mb-20">
        <div className="flex flex-row w-full items-center mb-4">
          <SearchBar className="w-full" />
        </div>
        {items
          .filter(i => i.name.toLowerCase().match(searchQuery.toLowerCase()))
          .map((item, index) => (<Item className="w-[41vw]" key={index} item={item} />))}
      </main>
      <div data-show={cartNotEmpty} className="fixed bottom-0 w-full flex flex-row justify-around bg-light border-t-1 border-dark border-opacity-30
        transform transition-transform duration-500 data-[show=true]:translate-y-0 data-[show=false]:translate-y-full">
        <LinkButton href="carrito" icon={<ShoppingCartIcon className="w-4 h-4" />}>Ir al carrito</LinkButton>
        <LinkButton href="pagar" icon={<CreditCardIcon className="w-4 h-4" />}>Ir a pagar</LinkButton>
      </div>
    </>
  )
}
