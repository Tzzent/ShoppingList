'use client';

import { useCallback, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from './components/buttons/Button';
import ClientOnly from './components/ClientOnly';

import Container from './components/Container'
import InputSearch from './components/inputs/InputSearch'
import ItemBox from './components/ItemBox';
import ItemsContent from './components/ItemsContent';
import useAside from './hooks/useAside';
import useList from './hooks/useList';
import { ICategory } from './interfaces';

interface HomeClientProps {
  categories: ICategory[];
}

export default function HomeClient({
  categories,
}: HomeClientProps) {
  const { addItem } = useList();
  const { onSelectedItem } = useAside();
  const [categoriesTemp, setCategoriesTemp] = useState<ICategory[]>(categories);

  const searchItemByName = useCallback((itemName: string) => {
    if (!itemName) {
      setCategoriesTemp(categories);
      return;
    }

    const matchingCategories = categories.filter((category) =>
      category.items.some((item) =>
        item.name.toLowerCase().includes(itemName.toLowerCase())
      )
    );

    const matchingItems = matchingCategories.map((category) => ({
      id: category.id,
      name: category.name,
      top: category.top,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(itemName.toLowerCase())
      ),
    }));

    setCategoriesTemp(matchingItems);
  }, [categories]);

  return (
    <ClientOnly>
      <Container>
        <div
          className="
          flex
          flex-col
          justify-between
          lg:flex-row
          gap-5
          mb-10
          "
        >
          <div
            className="
            font-bold 
            text-2xl 
            max-w-xl
            "
          >
            <b className="text-[#F9A109]">Shoppingify</b> allows you take your shopping list wherever you go
          </div>
          <div className="w-full max-w-sm">
            <InputSearch
              onChange={(value) => searchItemByName(value)}
            />
          </div>
        </div>
        {categoriesTemp?.map(category => (
          category.items.length > 0 && (
            <ItemsContent
              key={category.id}
              title={category.name}
            >
              {category?.items?.map((item) => (
                <ItemBox
                  onClick={() => onSelectedItem(category, item)}
                  key={item.name}
                  nameItem={item.name}
                  rightContent={
                    <Button
                      onClick={() => addItem({ id: item.id, name: item.name, categoryName: category.name, quantity: 1 })}
                      icon={AiOutlinePlus}
                      link
                      className="
                      text-[#C1C1C4]
                      hover:text-[#F9A109]
                      hover:scale-125
                      "
                    />
                  }
                />
              ))}
            </ItemsContent>
          )))}
      </Container>
    </ClientOnly>
  )
}