import Link from "next/link";

import TextElement from "../typography/TextElement.typo";

interface DropdownListItemProps {
    itemName: string;
    itemAction?: () => void;
    itemClassName?: string;
    itemTextClassName?: string;
    itemLink?: string;
    addItemSeparatorLine?: boolean
}

interface DropdownProps {
    options: DropdownListItemProps[];
}


const DropdownListItem: React.FC<{ item: DropdownListItemProps }> = ({ item }) => {
    const { itemName, itemAction, itemClassName, itemTextClassName, itemLink, addItemSeparatorLine = true } = item;
    return (
        <>
            <li
                className={`hover:bg-gray-100 p-1 px-2 cursor-pointer rounded my-1 ${itemClassName}`}
                onClick={itemAction}
            >
                {
                    itemLink ?
                        <Link href={itemLink}>
                            <TextElement as="span" className={itemTextClassName}>
                                {itemName}
                            </TextElement>
                        </Link>
                        :
                        <TextElement as="span" className={itemTextClassName}>
                            {itemName}
                        </TextElement>
                }
            </li>
            {
                addItemSeparatorLine && <hr className="border-gray-200" />
            }
        </>
    )
}


const Dropdown: React.FC<DropdownProps> = ({ options }) => {
    return (
        <ul className="absolute right-4 md:right-10 bg-white rounded-lg shadow-md p-2 mt-2 z-[999999]">
            {
                options && options.map((item, index) => {
                    if (index === (options.length - 1)) item.addItemSeparatorLine = false;
                    return < DropdownListItem item={item} key={index} />
                }
                )
            }
        </ul >
    );
}
export default Dropdown;