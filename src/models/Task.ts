export interface Task {
    id: string;
    name: string;
    status: 'IN PROGRESS' | 'DONE' | 'COMPLETE';
    parentId?: string;
    dependencies?: Task[];
    totalDependencies?: number;
    doneDependencies?: number;
    completeDependencies?: number;
}