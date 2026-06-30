import React, { useRef, useState } from 'react';
import {
    View, Text, StyleSheet, SafeAreaView, ScrollView,
    TouchableOpacity, Switch, TextInput,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Colors, Spacing, Typography, Shadows } from '../Theme';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../../components';

// ─────────────────────────────────────────────────────────────────
// SHEET TYPE 1 — PICKER  (value selection)
// ─────────────────────────────────────────────────────────────────
type PickerConfig = {
    kind: 'picker';
    title: string; subtitle?: string;
    options: string[]; selected: string;
    iconName: string; iconColor: string; iconBg: string;
    onSelect: (v: string) => void;
};

const PickerSheet = ({ title, subtitle, options, selected, iconName, iconColor, iconBg, onSelect }: PickerConfig) => (
    <View style={s.wrap}>
        <View style={s.handle} />
        <View style={s.hdr}>
            <View style={[s.ico, { backgroundColor: iconBg }]}>
                <Ionicons name={iconName as any} size={22} color={iconColor} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={s.hdTitle}>{title}</Text>
                {subtitle && <Text style={s.hdSub}>{subtitle}</Text>}
            </View>
        </View>
        <View style={s.div} />
        <View style={{ gap: 8 }}>
            {options.map(opt => {
                const active = opt === selected;
                return (
                    <TouchableOpacity key={opt} activeOpacity={0.72}
                        style={[s.optRow, active && { borderColor: iconColor, backgroundColor: iconBg }]}
                        onPress={() => onSelect(opt)}>
                        <Text style={[s.optTxt, active && { color: iconColor, fontWeight: '700' }]}>{opt}</Text>
                        {active
                            ? <Ionicons name="checkmark-circle" size={20} color={iconColor} />
                            : <View style={{ width: 20 }} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    </View>
);

// ─────────────────────────────────────────────────────────────────
// SHEET TYPE 2 — TOGGLE  (description + big switch)
// ─────────────────────────────────────────────────────────────────
type ToggleConfig = {
    kind: 'toggle';
    title: string; subtitle?: string; description: string;
    iconName: string; iconColor: string; iconBg: string;
    value: boolean; onChange: (v: boolean) => void;
};

const ToggleSheet = ({ title, subtitle, description, iconName, iconColor, iconBg, value, onChange }: ToggleConfig) => (
    <View style={s.wrap}>
        <View style={s.handle} />
        <View style={s.hdr}>
            <View style={[s.ico, { backgroundColor: iconBg }]}>
                <Ionicons name={iconName as any} size={22} color={iconColor} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={s.hdTitle}>{title}</Text>
                {subtitle && <Text style={s.hdSub}>{subtitle}</Text>}
            </View>
        </View>
        <View style={s.div} />
        <View style={[s.descBox, { borderLeftColor: iconColor }]}>
            <Text style={s.descTxt}>{description}</Text>
        </View>
        <View style={s.bigToggleRow}>
            <Text style={[s.bigToggleLabel, { color: value ? iconColor : '#94a3b8' }]}>
                {value ? 'Enabled' : 'Disabled'}
            </Text>
            <Switch value={value} onValueChange={onChange}
                trackColor={{ true: iconColor, false: '#e2e8f0' }} thumbColor="#fff" />
        </View>
    </View>
);

// ─────────────────────────────────────────────────────────────────
// SHEET TYPE 3 — INFO / ACTION  (navigate, legal, danger, logout)
// ─────────────────────────────────────────────────────────────────
type InfoConfig = {
    kind: 'info';
    title: string; subtitle?: string; description: string;
    iconName: string; iconColor: string; iconBg: string;
    actionLabel?: string; danger?: boolean;
    onAction?: () => void; onClose: () => void;
};

const InfoSheet = ({ title, subtitle, description, iconName, iconColor, iconBg, actionLabel, danger, onAction, onClose }: InfoConfig) => (
    <View style={s.wrap}>
        <View style={s.handle} />
        <View style={s.hdr}>
            <View style={[s.ico, { backgroundColor: iconBg }]}>
                <Ionicons name={iconName as any} size={22} color={iconColor} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={[s.hdTitle, danger && { color: '#ef4444' }]}>{title}</Text>
                {subtitle && <Text style={s.hdSub}>{subtitle}</Text>}
            </View>
        </View>
        <View style={s.div} />
        <View style={[s.descBox, { borderLeftColor: iconColor }]}>
            <Text style={s.descTxt}>{description}</Text>
        </View>
        {actionLabel && (
            <TouchableOpacity activeOpacity={0.85}
                style={[s.actionBtn, { backgroundColor: danger ? '#ef4444' : iconColor }]}
                onPress={onAction ?? onClose}>
                <Text style={s.actionTxt}>{actionLabel}</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
        )}
        <TouchableOpacity style={s.cancelBtn} onPress={onClose} activeOpacity={0.7}>
            <Text style={s.cancelTxt}>Close</Text>
        </TouchableOpacity>
    </View>
);

// ─────────────────────────────────────────────────────────────────
// SHEET TYPE 4 — EDIT  (text field, save)
// ─────────────────────────────────────────────────────────────────
type EditConfig = {
    kind: 'edit';
    title: string; subtitle?: string;
    iconName: string; iconColor: string; iconBg: string;
    value: string; placeholder?: string;
    onSave: (v: string) => void; onClose: () => void;
};

const EditSheet = ({ title, subtitle, iconName, iconColor, iconBg, value, placeholder, onSave, onClose }: EditConfig) => {
    const [input, setInput] = useState(value);
    return (
        <View style={s.wrap}>
            <View style={s.handle} />
            <View style={s.hdr}>
                <View style={[s.ico, { backgroundColor: iconBg }]}>
                    <Ionicons name={iconName as any} size={22} color={iconColor} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={s.hdTitle}>{title}</Text>
                    {subtitle && <Text style={s.hdSub}>{subtitle}</Text>}
                </View>
            </View>
            <View style={s.div} />
            <TextInput
                value={input} onChangeText={setInput}
                style={[s.editInput, { borderColor: iconColor }]}
                placeholder={placeholder} placeholderTextColor="#94a3b8"
                autoFocus returnKeyType="done"
                onSubmitEditing={() => { onSave(input.trim() || value); onClose(); }}
            />
            <TouchableOpacity activeOpacity={0.85}
                style={[s.actionBtn, { backgroundColor: iconColor }]}
                onPress={() => { onSave(input.trim() || value); onClose(); }}>
                <Text style={s.actionTxt}>Save</Text>
                <Ionicons name="checkmark" size={16} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={s.cancelBtn} onPress={onClose} activeOpacity={0.7}>
                <Text style={s.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

// ─────────────────────────────────────────────────────────────────
// SHARED SHEET STYLES
// ─────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
    wrap: { paddingHorizontal: 20, paddingBottom: 32 },
    handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#cbd5e1', alignSelf: 'center', marginTop: 12, marginBottom: 20 },
    hdr: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
    ico: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    hdTitle: { fontSize: 18, fontWeight: '800', color: '#1e293b' },
    hdSub: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
    div: { height: 1, backgroundColor: '#f1f5f9', marginBottom: 16 },
    optRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#f8fafc', borderRadius: 14,
        paddingHorizontal: 16, paddingVertical: 13,
        borderWidth: 1.5, borderColor: '#f1f5f9',
    },
    optTxt: { fontSize: 14, fontWeight: '600', color: '#334155' },
    descBox: { borderLeftWidth: 3, paddingLeft: 14, marginBottom: 20, paddingVertical: 4 },
    descTxt: { fontSize: 14, color: '#475569', lineHeight: 22 },
    bigToggleRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#f8fafc', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 14,
    },
    bigToggleLabel: { fontSize: 16, fontWeight: '700' },
    actionBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 8, paddingVertical: 14, borderRadius: 14, marginBottom: 10,
    },
    actionTxt: { color: '#fff', fontSize: 15, fontWeight: '700' },
    cancelBtn: { alignItems: 'center', paddingVertical: 10 },
    cancelTxt: { fontSize: 14, color: '#94a3b8', fontWeight: '600' },
    editInput: {
        borderWidth: 1.5, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13,
        fontSize: 15, color: '#1e293b', backgroundColor: '#f8fafc', marginBottom: 16,
    },
});

// ─────────────────────────────────────────────────────────────────
// UNION TYPE
// ─────────────────────────────────────────────────────────────────
type SheetConfig = PickerConfig | ToggleConfig | InfoConfig | EditConfig;

// ─────────────────────────────────────────────────────────────────
// MAIN SCREEN
// ─────────────────────────────────────────────────────────────────
const SettingsScreen = () => {
    const rbSheetRef = useRef<any>(null);
    const [sheetConfig, setSheetConfig] = useState<SheetConfig | null>(null);

    const [childName, setChildName] = useState('Alex');
    const [childAge, setChildAge] = useState('6 yrs');
    const [sessionLimit, setSessionLimit] = useState('20 mins');
    const [breakReminders, setBreakReminders] = useState(true);
    const [contentFilter, setContentFilter] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [quietHours, setQuietHours] = useState(false);
    const [alertChannel, setAlertChannel] = useState('App + Email');
    const [language, setLanguage] = useState('English');
    const [textSize, setTextSize] = useState('Medium');
    const [biometrics, setBiometrics] = useState(true);
    const [twoFA, setTwoFA] = useState(false);

    const close = () => rbSheetRef.current?.close();
    const open = (cfg: SheetConfig) => { setSheetConfig(cfg); rbSheetRef.current?.open(); };

    const picker = (base: Omit<PickerConfig, 'kind' | 'onSelect'>, set: (v: string) => void) =>
        open({ kind: 'picker', ...base, onSelect: v => { set(v); close(); } });

    const toggle = (base: Omit<ToggleConfig, 'kind'>) =>
        open({ kind: 'toggle', ...base });

    const info = (base: Omit<InfoConfig, 'kind' | 'onClose'>) =>
        open({ kind: 'info', ...base, onClose: close });

    const edit = (base: Omit<EditConfig, 'kind' | 'onClose'>) =>
        open({ kind: 'edit', ...base, onClose: close });

    // ── UI atoms ──────────────────────────────────────────────────
    const Div = () => <View style={st.div} />;

    const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <View style={st.section}>
            <Text style={st.secHdr}>{title}</Text>
            <View style={st.secCard}>{children}</View>
        </View>
    );

    const Row = ({ icon, iconColor, iconBg, label, sub, right, onPress, danger = false }: {
        icon: string; iconColor: string; iconBg: string;
        label: string; sub?: string; right: React.ReactNode;
        onPress: () => void; danger?: boolean;
    }) => (
        <TouchableOpacity style={st.row} onPress={onPress} activeOpacity={0.7}>
            <View style={[st.iconBox, { backgroundColor: iconBg }]}>
                <Ionicons name={icon as any} size={18} color={iconColor} />
            </View>
            <View style={st.textBlock}>
                <Text style={[st.label, danger && { color: '#ef4444' }]}>{label}</Text>
                {sub ? <Text style={st.sub}>{sub}</Text> : null}
            </View>
            {right}
        </TouchableOpacity>
    );

    const Chip = ({ value, color }: { value: string; color: string }) => (
        <View style={st.chip}>
            <Text style={[st.chipTxt, { color }]}>{value}</Text>
            <Ionicons name="chevron-forward" size={13} color="#cbd5e1" />
        </View>
    );

    const TChip = ({ on, color }: { on: boolean; color: string }) => (
        <View style={[st.tchip, { backgroundColor: on ? color + '15' : '#f1f5f9' }]}>
            <View style={[st.tdot, { backgroundColor: on ? color : '#94a3b8' }]} />
            <Text style={[st.tchipTxt, { color: on ? color : '#94a3b8' }]}>{on ? 'On' : 'Off'}</Text>
            <Ionicons name="chevron-forward" size={12} color="#cbd5e1" />
        </View>
    );

    const Fwd = ({ color = '#cbd5e1' }: { color?: string }) =>
        <Ionicons name="chevron-forward" size={15} color={color} />;

    // ─────────────────────────────────────────────────────────────
    return (
        <SafeAreaView style={st.container}>
            <ScrollView contentContainerStyle={st.scroll} showsVerticalScrollIndicator={false}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View>
                        <Text style={st.eyebrow}>PREFERENCES</Text>
                        <Text style={st.pageTitle}>Settings</Text>
                    </View>
                    <Avatar size={60} emoji="👩‍🏫" />
                </View>

                {/* ── Child Profile ── */}
                <Section title="Child Profile">
                    <Row icon="person" iconColor="#6366f1" iconBg="#eef2ff"
                        label="Child Name" sub={childName}
                        onPress={() => edit({
                            title: 'Child Name', subtitle: 'Update the child\'s display name',
                            iconName: 'person', iconColor: '#6366f1', iconBg: '#eef2ff',
                            value: childName, placeholder: 'Enter name', onSave: setChildName,
                        })}
                        right={<Fwd />} />
                    <Div />
                    <Row icon="calendar" iconColor="#10b981" iconBg="#ecfdf5"
                        label="Age Group" sub="Affects AI calibration"
                        onPress={() => picker({
                            title: 'Age Group', subtitle: 'Affects AI language and activity calibration',
                            options: ['2–3 yrs', '4–5 yrs', '6 yrs', '7 yrs', '8 yrs', '9–12 yrs'],
                            selected: childAge, iconName: 'calendar', iconColor: '#10b981', iconBg: '#ecfdf5',
                        }, setChildAge)}
                        right={<Chip value={childAge} color="#10b981" />} />
                </Section>

                {/* ── Safety & Session Controls ── */}
                <Section title="Safety & Session Controls">
                    <Row icon="timer" iconColor="#f59e0b" iconBg="#fffbeb"
                        label="Daily Session Limit" sub="Auto-pauses when reached"
                        onPress={() => picker({
                            title: 'Daily Session Limit',
                            options: ['10 mins', '15 mins', '20 mins', '30 mins', '45 mins', 'No limit'],
                            selected: sessionLimit, iconName: 'timer', iconColor: '#f59e0b', iconBg: '#fffbeb',
                        }, setSessionLimit)}
                        right={<Chip value={sessionLimit} color="#f59e0b" />} />
                    <Div />
                    <Row icon="pause-circle" iconColor="#6366f1" iconBg="#eef2ff"
                        label="Break Reminders" sub="Pause prompt every 10 mins"
                        onPress={() => toggle({
                            title: 'Break Reminders', subtitle: 'Pause prompt every 10 mins',
                            description: 'Displays a gentle break prompt every 10 minutes during a session to encourage rest and healthy screen habits.',
                            iconName: 'pause-circle', iconColor: '#6366f1', iconBg: '#eef2ff',
                            value: breakReminders, onChange: setBreakReminders,
                        })}
                        right={<TChip on={breakReminders} color="#6366f1" />} />
                    <Div />
                    <Row icon="shield-checkmark" iconColor="#10b981" iconBg="#ecfdf5"
                        label="Content Safety Filter" sub="Block age-inappropriate content"
                        onPress={() => toggle({
                            title: 'Content Safety Filter', subtitle: 'Block age-inappropriate content',
                            description: 'Automatically filters and blocks any content flagged as inappropriate for the child\'s age group. Recommended to keep enabled at all times.',
                            iconName: 'shield-checkmark', iconColor: '#10b981', iconBg: '#ecfdf5',
                            value: contentFilter, onChange: setContentFilter,
                        })}
                        right={<TChip on={contentFilter} color="#10b981" />} />
                </Section>

                {/* ── Notifications ── */}
                <Section title="Notifications & Alerts">
                    <Row icon="notifications" iconColor="#6366f1" iconBg="#eef2ff"
                        label="Push Notifications" sub="Session summaries & risk alerts"
                        onPress={() => toggle({
                            title: 'Push Notifications', subtitle: 'Session summaries & risk alerts',
                            description: 'Receive push notifications for session summaries, risk flag alerts, and weekly reports. Turning this off means you\'ll need to check the app manually.',
                            iconName: 'notifications', iconColor: '#6366f1', iconBg: '#eef2ff',
                            value: pushNotifs, onChange: setPushNotifs,
                        })}
                        right={<TChip on={pushNotifs} color="#6366f1" />} />
                    <Div />
                    <Row icon="mail" iconColor="#10b981" iconBg="#ecfdf5"
                        label="Alert Channel" sub="Where urgent alerts are sent"
                        onPress={() => picker({
                            title: 'Alert Channel', subtitle: 'Where urgent alerts are delivered',
                            options: ['App Only', 'Email Only', 'App + Email', 'SMS + App'],
                            selected: alertChannel, iconName: 'mail', iconColor: '#10b981', iconBg: '#ecfdf5',
                        }, setAlertChannel)}
                        right={<Chip value={alertChannel} color="#10b981" />} />
                    <Div />
                    <Row icon="moon" iconColor="#6366f1" iconBg="#eef2ff"
                        label="Quiet Hours" sub="Suppress alerts 10 PM – 8 AM"
                        onPress={() => toggle({
                            title: 'Quiet Hours', subtitle: 'Suppress alerts 10 PM – 8 AM',
                            description: 'No notifications will be sent between 10 PM and 8 AM. Urgent risk flags are still logged and visible when you open the app.',
                            iconName: 'moon', iconColor: '#6366f1', iconBg: '#eef2ff',
                            value: quietHours, onChange: setQuietHours,
                        })}
                        right={<TChip on={quietHours} color="#6366f1" />} />
                </Section>

                {/* ── Language & Accessibility ── */}
                <Section title="Language & Accessibility">
                    <Row icon="language" iconColor="#6366f1" iconBg="#eef2ff"
                        label="Language" sub={language}
                        onPress={() => picker({
                            title: 'App Language', subtitle: 'Changes interface and AI session language',
                            options: ['English', 'Spanish', 'French', 'Arabic', 'Hindi', 'Mandarin'],
                            selected: language, iconName: 'language', iconColor: '#6366f1', iconBg: '#eef2ff',
                        }, setLanguage)}
                        right={<Chip value={language} color="#6366f1" />} />
                    <Div />
                    <Row icon="text" iconColor="#f59e0b" iconBg="#fffbeb"
                        label="Text Size" sub={textSize}
                        onPress={() => picker({
                            title: 'Text Size', subtitle: 'Adjust for readability',
                            options: ['Small', 'Medium', 'Large', 'Extra Large'],
                            selected: textSize, iconName: 'text', iconColor: '#f59e0b', iconBg: '#fffbeb',
                        }, setTextSize)}
                        right={<Chip value={textSize} color="#f59e0b" />} />
                </Section>

                {/* ── Account & Security ── */}
                <Section title="Account & Security">
                    <Row icon="finger-print" iconColor="#10b981" iconBg="#ecfdf5"
                        label="Biometric Login" sub="Face ID / Fingerprint"
                        onPress={() => toggle({
                            title: 'Biometric Login', subtitle: 'Face ID / Fingerprint',
                            description: 'Use Face ID or fingerprint to unlock the app. Your biometric data is stored locally on device and never shared.',
                            iconName: 'finger-print', iconColor: '#10b981', iconBg: '#ecfdf5',
                            value: biometrics, onChange: setBiometrics,
                        })}
                        right={<TChip on={biometrics} color="#10b981" />} />
                    <Div />
                    <Row icon="shield" iconColor="#f59e0b" iconBg="#fffbeb"
                        label="Two-Factor Authentication" sub="Extra layer of security"
                        onPress={() => toggle({
                            title: 'Two-Factor Authentication', subtitle: 'Extra layer of security',
                            description: 'Require a verification code in addition to your password when logging in. Codes are sent to your registered email or via an authenticator app.',
                            iconName: 'shield', iconColor: '#f59e0b', iconBg: '#fffbeb',
                            value: twoFA, onChange: setTwoFA,
                        })}
                        right={<TChip on={twoFA} color="#f59e0b" />} />
                    <Div />
                    <Row icon="lock-closed" iconColor="#6366f1" iconBg="#eef2ff"
                        label="Change Password" sub="Last changed 30 days ago"
                        onPress={() => info({
                            title: 'Change Password', subtitle: 'Last changed 30 days ago',
                            description: 'You will receive a secure password reset link at your registered email address. After changing, you will be signed out of all other devices.',
                            iconName: 'lock-closed', iconColor: '#6366f1', iconBg: '#eef2ff',
                            actionLabel: 'Send Reset Email',
                        })}
                        right={<Fwd />} />
                </Section>

                {/* ── Legal & Compliance ── */}
                <Section title="Legal & Compliance">
                    <Row icon="document-text" iconColor="#6366f1" iconBg="#eef2ff"
                        label="Privacy Policy"
                        onPress={() => info({
                            title: 'Privacy Policy',
                            description: 'We are committed to protecting your child\'s data. We do not sell personal information and comply with COPPA, GDPR, and HIPAA. All session data is encrypted at rest and in transit.',
                            iconName: 'document-text', iconColor: '#6366f1', iconBg: '#eef2ff',
                            actionLabel: 'View Full Policy',
                        })}
                        right={<Fwd />} />
                    <Div />
                    <Row icon="reader" iconColor="#10b981" iconBg="#ecfdf5"
                        label="Terms of Service"
                        onPress={() => info({
                            title: 'Terms of Service',
                            description: 'Review the platform terms governing your use of child session data, AI analysis features, and clinician integrations. Last updated January 2025.',
                            iconName: 'reader', iconColor: '#10b981', iconBg: '#ecfdf5',
                            actionLabel: 'View Terms',
                        })}
                        right={<Fwd />} />
                    <Div />
                    <Row icon="trash" iconColor="#ef4444" iconBg="#fef2f2"
                        label="Delete Child Data" sub="Permanently erase all records"
                        onPress={() => info({
                            title: 'Delete Child Data', subtitle: 'This cannot be undone',
                            description: 'This will permanently delete all session recordings, transcripts, risk flags, interest data, and reports. This action is irreversible.',
                            iconName: 'trash', iconColor: '#ef4444', iconBg: '#fef2f2',
                            actionLabel: 'Permanently Delete', danger: true,
                        })}
                        danger right={<Fwd color="#ef4444" />} />
                </Section>

                {/* Logout */}
                <TouchableOpacity style={st.logoutBtn} activeOpacity={0.8}
                    onPress={() => info({
                        title: 'Log Out', subtitle: 'You will be signed out',
                        description: 'Are you sure you want to log out? Your data is safely saved. You can log back in at any time with your credentials or biometrics.',
                        iconName: 'log-out-outline', iconColor: '#ef4444', iconBg: '#fef2f2',
                        actionLabel: 'Confirm Log Out', danger: true,
                    })}>
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text style={st.logoutTxt}>Log Out</Text>
                </TouchableOpacity>

                <Text style={st.version}>Version 1.0.0 · Build 42</Text>
            </ScrollView>

            {/* ── Bottom Sheet ── */}
            <RBSheet ref={rbSheetRef} height={440} openDuration={270} closeDuration={230} draggable
                customStyles={{
                    wrapper: { backgroundColor: 'rgba(15,23,42,0.45)' },
                    container: { borderTopLeftRadius: 28, borderTopRightRadius: 28, backgroundColor: '#fff' },
                    draggableIcon: { display: 'none' },
                }}>
                {sheetConfig?.kind === 'picker' && <PickerSheet {...sheetConfig} />}
                {sheetConfig?.kind === 'toggle' && <ToggleSheet {...sheetConfig} />}
                {sheetConfig?.kind === 'info' && <InfoSheet {...sheetConfig} />}
                {sheetConfig?.kind === 'edit' && <EditSheet {...sheetConfig} />}
            </RBSheet>
        </SafeAreaView>
    );
};

const st = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scroll: { padding: Spacing.xl, paddingBottom: 56 },
    eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: '#6366f1', marginBottom: 4 },
    pageTitle: { ...Typography.header, fontSize: 32, fontWeight: '800', marginBottom: 28 },
    section: { marginBottom: 22 },
    secHdr: { fontSize: 11, fontWeight: '700', color: '#94a3b8', letterSpacing: 1.2, marginBottom: 8, marginLeft: 4, textTransform: 'uppercase' },
    secCard: { backgroundColor: Colors.white, borderRadius: 20, overflow: 'hidden', ...Shadows.light },
    div: { height: 1, backgroundColor: '#f8fafc', marginHorizontal: 16 },
    row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, gap: 12 },
    iconBox: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    textBlock: { flex: 1 },
    label: { fontSize: 14, fontWeight: '600', color: '#1e293b' },
    sub: { fontSize: 12, color: '#94a3b8', marginTop: 1 },
    chip: { flexDirection: 'row', alignItems: 'center', gap: 3 },
    chipTxt: { fontSize: 13, fontWeight: '700' },
    tchip: { flexDirection: 'row', alignItems: 'center', gap: 5, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
    tdot: { width: 7, height: 7, borderRadius: 4 },
    tchipTxt: { fontSize: 12, fontWeight: '700' },
    logoutBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 8, paddingVertical: 15, borderRadius: 16,
        backgroundColor: '#fef2f2', borderWidth: 1.5, borderColor: '#fecaca',
        marginTop: 4, marginBottom: 14,
    },
    logoutTxt: { color: '#ef4444', fontWeight: '800', fontSize: 15 },
    version: { textAlign: 'center', fontSize: 12, color: '#cbd5e1', marginBottom: 8 },
});

export default SettingsScreen;