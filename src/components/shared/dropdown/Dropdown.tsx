import Link from "next/link";

import TextElement from "../typography/TextElement.typo";

interface DropdownListItemProps {
  itemName: string;
  itemAction?: () => void;
  itemClassName?: string;
  itemTextClassName?: string;
  itemLink?: string;
  addItemSeparatorLine?: boolean;
}

interface DropdownProps {
  options: DropdownListItemProps[];
}

const DropdownListItem: React.FC<{ item: DropdownListItemProps }> = ({
  item,
}) => {
  const {
    itemName,
    itemAction,
    itemClassName,
    itemTextClassName,
    itemLink,
    addItemSeparatorLine = true,
  } = item;
  return (
    <>
      <li
        className={`my-1 cursor-pointer rounded p-1 px-2 hover:bg-gray-100 ${itemClassName}`}
        onClick={itemAction}
      >
        {itemLink ? (
          <Link href={itemLink}>
            <TextElement as="span" className={itemTextClassName}>
              {itemName}
            </TextElement>
          </Link>
        ) : (
          <TextElement as="span" className={itemTextClassName}>
            {itemName}
          </TextElement>
        )}
      </li>
      {addItemSeparatorLine && <hr className="border-gray-200" />}
    </>
  );
};

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  return (
    <ul className="absolute right-4 z-[999999] mt-2 rounded-lg bg-white p-2 shadow-md md:right-10">
      {options &&
        options.map((item, index) => {
          if (index === options.length - 1) item.addItemSeparatorLine = false;
          return <DropdownListItem item={item} key={index} />;
        })}
    </ul>
  );
};
export default Dropdown;
