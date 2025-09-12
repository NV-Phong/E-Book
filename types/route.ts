export interface RouteItem {
   path: string;
   children?: RouteItem[];
}

export interface RoutesData {
   routes: RouteItem[];
   api: RouteItem[];
}