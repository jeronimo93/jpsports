import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';
import { colors, fonts, tracking } from '../tokens';

// TabBar labels are 10px — applying `tracking.caps` (0.08) gives the
// same visual tightness as other uppercase chrome in the system.

export type TabId = 'feed' | 'scores' | 'clips' | 'squad' | 'me';

export type Tab = {
  id: TabId;
  label: string;
};

export const DEFAULT_TABS: Tab[] = [
  { id: 'feed',   label: 'Feed' },
  { id: 'scores', label: 'Scores' },
  { id: 'clips',  label: 'Clips' },
  { id: 'squad',  label: 'Squad' },
  { id: 'me',     label: 'Me' },
];

export type TabBarProps = {
  active: TabId;
  onChange: (id: TabId) => void;
  tabs?: Tab[];
  style?: ViewStyle;
};

export function TabBar({ active, onChange, tabs = DEFAULT_TABS, style }: TabBarProps) {
  return (
    <View style={[styles.nav, style]}>
      {tabs.map((t) => {
        const isActive = active === t.id;
        const color = isActive ? colors.volt : colors.fog;
        return (
          <Pressable key={t.id} onPress={() => onChange(t.id)} style={styles.tab}>
            <TabIcon id={t.id} color={color} />
            <Text
              style={{
                color,
                fontFamily: fonts.body,
                fontWeight: '700',
                fontSize: 10,
                letterSpacing: 10 * tracking.caps,
                textTransform: 'uppercase',
              }}
            >
              {t.label}
            </Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.volt,
                opacity: isActive ? 1 : 0,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

function TabIcon({ id, color }: { id: TabId; color: string }) {
  switch (id) {
    case 'feed':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z" fill={color} />
        </Svg>
      );
    case 'scores':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Rect x={3} y={5} width={18} height={14} rx={2} fill="none" stroke={color} strokeWidth={2} />
          <Path d="M3 10h18M8 5v14" stroke={color} strokeWidth={2} />
        </Svg>
      );
    case 'clips':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path
            d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm5 5v8l6-4-6-4Z"
            fill={color}
          />
        </Svg>
      );
    case 'squad':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <G>
            <Circle cx={9} cy={8} r={3} fill={color} />
            <Circle cx={17} cy={10} r={2.5} fill={color} />
            <Path
              d="M3 20c0-3 2.5-6 6-6s6 3 6 6M14 18c0-2 1.5-4 3-4s3 2 3 4"
              fill="none"
              stroke={color}
              strokeWidth={2}
            />
          </G>
        </Svg>
      );
    case 'me':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Circle cx={12} cy={8} r={4} fill="none" stroke={color} strokeWidth={2} />
          <Path d="M4 21c0-4 4-7 8-7s8 3 8 7" fill="none" stroke={color} strokeWidth={2} />
        </Svg>
      );
  }
}

// backdrop-filter is web-only; on native we fall back to the flat
// translucent background. Wrapped in Platform.select so the native
// build doesn't ship invalid style keys.
const webBackdrop = Platform.select({
  web: { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' },
  default: null,
}) as ViewStyle | null;

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(14,16,24,0.72)',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 10,
    paddingBottom: 28,
    paddingHorizontal: 4,
    ...(webBackdrop ?? {}),
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
