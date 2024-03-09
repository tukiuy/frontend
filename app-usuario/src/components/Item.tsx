import { TItem } from '@/types/items';
import Image from 'next/image';
import ItemActions from './ItemActions';
import getUserData from '@/functions/getUserData';

export default async function Item({ item, className }: { item: TItem; className?: string }): Promise<JSX.Element> {
    const [device, user] = await getUserData();
    return <>
        <div
            className={`${className} grid grid-cols-1 grid-rows-2 mb-2 rounded-3xl overflow-hidden box-content bg-light  border-1 border-dark border-opacity-10 `}
        >
            <div className='flex flex-col items-center justify-end'>
                <div className="w-[30vw] h-[30vw] overflow-hidden box-content">
                    <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="w-full h-full scale-100"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 grid-rows-2 w-full h-full border-t-1 ">
                <div className='my-auto row-span-1'>
                    <h2 className='text-md text-center font-medium ml-2'>${item.price}</h2>
                    <p className="text-sm text-dark font-normal text-center mx-2 lowercase first-letter:capitalize text-ellipsis">
                        {item.description}
                    </p>
                </div>
                <div className='relative flex flex-row items-center justify-center row-span-1'>
                    <ItemActions user={user} device={device} item={item} />
                    {/* <ItemSsrActions userId={''} device={device} item={item} /> */}
                </div>
            </div>
        </div>
    </>
} 