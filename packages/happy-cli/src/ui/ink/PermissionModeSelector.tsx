import React, { useState } from 'react';
import { Text, useInput, Box } from 'ink';

export type PermissionMode = 'default' | 'acceptEdits' | 'bypassPermissions' | 'plan';

interface PermissionModeSelectorProps {
    onSelect: (mode: PermissionMode) => void;
    onCancel: () => void;
}

const options: Array<{
    mode: PermissionMode;
    label: string;
    description: string;
}> = [
    {
        mode: 'default',
        label: 'Default',
        description: 'Normal permission checks'
    },
    {
        mode: 'acceptEdits',
        label: 'Accept Edits',
        description: 'Auto-accept file edits'
    },
    {
        mode: 'bypassPermissions',
        label: 'Bypass Permissions',
        description: '--dangerously-skip-permissions'
    },
    {
        mode: 'plan',
        label: 'Plan',
        description: 'Plan mode only'
    }
];

export const PermissionModeSelector: React.FC<PermissionModeSelectorProps> = ({ onSelect, onCancel }) => {
    const [selectedIndex, setSelectedIndex] = useState(2);

    useInput((input, key) => {
        if (key.upArrow) {
            setSelectedIndex(prev => Math.max(0, prev - 1));
        } else if (key.downArrow) {
            setSelectedIndex(prev => Math.min(options.length - 1, prev + 1));
        } else if (key.return) {
            onSelect(options[selectedIndex].mode);
        } else if (key.escape || (key.ctrl && input === 'c')) {
            onCancel();
        } else if (input === '1') {
            setSelectedIndex(0);
            onSelect('default');
        } else if (input === '2') {
            setSelectedIndex(1);
            onSelect('acceptEdits');
        } else if (input === '3') {
            setSelectedIndex(2);
            onSelect('bypassPermissions');
        } else if (input === '4') {
            setSelectedIndex(3);
            onSelect('plan');
        }
    });

    return (
        <Box flexDirection="column" paddingY={1}>
            <Box marginBottom={1}>
                <Text>Select permission mode:</Text>
            </Box>

            <Box flexDirection="column">
                {options.map((option, index) => {
                    const isSelected = selectedIndex === index;

                    return (
                        <Box key={option.mode} marginY={0}>
                            <Text color={isSelected ? "cyan" : "gray"}>
                                {isSelected ? '› ' : '  '}
                                {index + 1}. {option.label}
                            </Text>
                            <Text dimColor>  {option.description}</Text>
                        </Box>
                    );
                })}
            </Box>

            <Box marginTop={1}>
                <Text dimColor>Use arrows or 1-4 to select, Enter to confirm, ESC for default</Text>
            </Box>
        </Box>
    );
};
