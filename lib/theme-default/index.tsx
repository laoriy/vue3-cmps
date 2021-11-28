import SelectionWidget from './SelectionWidget';
import { Theme } from '../types';
import TextWidget from './TextWidget';
import NumberWidget from './NumberWidget';

const defaultTheme = ({
    widgets: { SelectionWidget, TextWidget, NumberWidget },
} as unknown) as Theme;

export default defaultTheme;
