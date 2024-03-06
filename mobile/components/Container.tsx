import React from 'react';
import { Layout, StyleService } from '@ui-kitten/components';
// import useLayout from 'hooks/useLayout';
import theme from '../utils/theme';
import { ContainerProps } from '../types/component-types';
import useLayout from '../hooks/useLayout';
// import theme from 'theme';

const themedStyles = StyleService.create({
    container: {
        // paddingTop: theme.paddings.medium,
        // paddingBottom: theme.paddings.medium
    }
});

const Container: React.FC<ContainerProps> = ({
    children,
    style,
    useSafeArea = true,
    ...props
}) => {
    const { top, bottom } = useLayout();
    return (
        <Layout
            {...props}
            style={[
                { flex: 1 },
                useSafeArea && { paddingTop: top, paddingBottom: bottom },
                style,
                themedStyles.container,
            ]}>
            {children}
        </Layout>
    );
};

export default Container;

