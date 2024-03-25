export function read_data(): string;

export function set_data(data: string): void;

export function add_modul_ab_viewer(canvas_id: string, stage_width: number, location_id: string, data: string): string;

export function add_modul_h_viewer(canvas_id: string, stage_width: number, location_id: string, data: string): string;

export function add_modul_ab_editor(canvas_id: string, stage_width: number, location_id: string, data: string): string;

export function add_modul_h_editor(canvas_id: string, stage_width: number, location_id: string, data: string): string;

export function set_debug_mode(): void;

export default function init(input: string): Promise<unknown>;
