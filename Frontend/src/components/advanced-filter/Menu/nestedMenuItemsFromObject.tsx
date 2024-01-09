import { Filter, FilterItem } from '../types';
import CheckboxMenu from './filter-item/CheckboxMenu';
import DatePickerMenu from './filter-item/DatePickerMenu';
import DateRangePickerMenu from './filter-item/DateRangePickerMenu';
import NumberMenu from './filter-item/NumberMenu';
import NumberRangeMenu from './filter-item/NumberRangeMenu';
import SwitchMenuItem from './filter-item/Switch';
import TextMenu from './filter-item/TextMenu';
import { NestedMenuItem } from './NestedMenuItem';

export interface NestedMenuItemsFromObjectProps<T extends object> {
  isOpen: boolean;
  handleClose: () => void;
  filter: Filter<T>;
  saveFilter: (filterItem: FilterItem<T>) => void;
}

/**
 * Create a JSX element with nested elements creating a nested menu.
 * Every menu item should have a uid provided
 */
const nestedMenuItemsFromObject = <T extends object>({
  isOpen,
  handleClose,
  filter,
  saveFilter,
}: NestedMenuItemsFromObjectProps<T>) => {
  const handleRenderByType = (filterItem: FilterItem<T>) => {
    if (!filterItem) {
      return;
    }
    const { key } = filterItem;
    switch (filterItem.type) {
      case 'checkbox':
        return (
          <CheckboxMenu key={JSON.stringify(key)} filterItem={filterItem} saveFilter={saveFilter} />
        );
      // case 'radio':
      //   return (
      //     <RadioButtonMenu
      //       key={key}
      //       filterItem={filterItem}
      //       objectName={objectName}
      //       saveFilter={saveFilter}
      //       path={path.concat(objectName)}
      //       onClick={(event: React.MouseEvent<HTMLElement>) => {
      //         handleClose();
      //         callback && callback(event, filterItem);
      //       }}
      //       disabled={disabled}
      //     />
      //   );
      case 'date':
        return (
          <DatePickerMenu
            key={JSON.stringify(key)}
            filterItem={filterItem}
            label={filterItem.label}
            saveFilter={saveFilter}
          />
        );
      case 'date-range':
        return (
          <DateRangePickerMenu
            key={JSON.stringify(key)}
            filterItem={filterItem}
            label={filterItem.label}
            saveFilter={saveFilter}
          />
        );
      case 'number-range':
        return (
          <NumberRangeMenu
            key={JSON.stringify(key)}
            filterItem={filterItem}
            label={filterItem.label}
            saveFilter={saveFilter}
          />
        );
      case 'number':
        return (
          <NumberMenu
            key={JSON.stringify(key)}
            filterItem={filterItem}
            label={filterItem.label}
            saveFilter={saveFilter}
          />
        );
      case 'text':
        return (
          <TextMenu
            key={JSON.stringify(key)}
            filterItem={filterItem}
            label={filterItem.label}
            saveFilter={saveFilter}
            handleClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  if (Array.isArray(filter) && filter.length > 0) {
    const renderedItems = filter.map((filterItem, index) => {
      if (filterItem.type === 'switch') {
        return (
          <SwitchMenuItem
            key={JSON.stringify(filterItem.key)}
            filterItem={filterItem}
            saveFilter={saveFilter}
          />
        );
      } else {
        return (
          <NestedMenuItem
            key={JSON.stringify(filterItem.key)}
            label={filterItem.label}
            parentMenuOpen={isOpen}
            disabled={false}
          >
            {handleRenderByType(filterItem)}
          </NestedMenuItem>
        );
      }
    });

    return renderedItems;
  }
  return null;
};

export default nestedMenuItemsFromObject;
