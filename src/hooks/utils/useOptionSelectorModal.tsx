import React from 'react';
import { useCallback } from 'react';
import { useModal } from '@hooks';
import { OptionSelectorDrawer } from '@components/organisms';
import { OptionSelectorItemProps } from '@components/organisms/OptionSelectorDrawer';

interface OptionsSelectorProps {
  title: string;
  listOptions: Array<OptionSelectorItemProps>;
  numColumns?: number;
  centered?: boolean;
}

export const useOptionSelectorModal = (): {
  optionSelectorModal: ({
    title,
    listOptions,
    numColumns,
    centered,
  }: OptionsSelectorProps) => void;
} => {
  // Global Hooks
  const { showModal } = useModal();

  const optionSelectorModal = useCallback(
    ({ title, listOptions, numColumns, centered }: OptionsSelectorProps) => {
      showModal({
        type: 'bottomsheet',
        title: title || '',
        body: (
          <OptionSelectorDrawer
            listOptions={listOptions}
            numColumns={numColumns}
            centered={centered}
          />
        ),
        expandible: true,
        drawerOptions: {
          height: 250,
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
    },
    [],
  );

  return { optionSelectorModal };
};
