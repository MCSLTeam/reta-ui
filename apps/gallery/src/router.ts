import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import DocsPage from "./pages/DocsPage.vue";
import PageHeaderPage from "./pages/PageHeaderPage.vue";
import ButtonsPage from "./pages/ButtonsPage.vue";
import InputPage from "./pages/InputPage.vue";
import NumberBoxPage from "./pages/NumberBoxPage.vue";
import SelectPage from "./pages/SelectPage.vue";
import ComboboxPage from "./pages/ComboboxPage.vue";
import DateTimePage from "./pages/DateTimePage.vue";
import SliderPage from "./pages/SliderPage.vue";
import RadioPage from "./pages/RadioPage.vue";
import CheckboxPage from "./pages/CheckboxPage.vue";
import TogglePage from "./pages/TogglePage.vue";
import ResultPage from "./pages/ResultPage.vue";
import EmptyPage from "./pages/EmptyPage.vue";
import DividerPage from "./pages/DividerPage.vue";
import CopyableTextPage from "./pages/CopyableTextPage.vue";
import CodePage from "./pages/CodePage.vue";
import SkeletonPage from "./pages/SkeletonPage.vue";
import DisplayPage from "./pages/DisplayPage.vue";
import FeedbackPage from "./pages/FeedbackPage.vue";
import NavigationPage from "./pages/NavigationPage.vue";
import BreadcrumbsPage from "./pages/BreadcrumbsPage.vue";
import SidebarPage from "./pages/SidebarPage.vue";
import NavTabsPage from "./pages/NavTabsPage.vue";
import StepsPage from "./pages/StepsPage.vue";
import DropdownPage from "./pages/DropdownPage.vue";
import DrawerPage from "./pages/DrawerPage.vue";
import ConfirmDialogPage from "./pages/ConfirmDialogPage.vue";
import TooltipPage from "./pages/TooltipPage.vue";
import PopoverPage from "./pages/PopoverPage.vue";
import ModalPage from "./pages/ModalPage.vue";
import ContextmenuPage from "./pages/ContextmenuPage.vue";
import OverlaysPage from "./pages/OverlaysPage.vue";
import ProgressPage from "./pages/ProgressPage.vue";
import PaginationPage from "./pages/PaginationPage.vue";
import UploadPage from "./pages/UploadPage.vue";
import AvatarPage from "./pages/AvatarPage.vue";
import TagPage from "./pages/TagPage.vue";
import TablePage from "./pages/TablePage.vue";
import DataTablePage from "./pages/DataTablePage.vue";
import MessagePage from "./pages/MessagePage.vue";
import KbdPage from "./pages/KbdPage.vue";
import EditorPage from "./pages/EditorPage.vue";
import AccordionPage from "./pages/AccordionPage.vue";
import TreePage from "./pages/TreePage.vue";
import CompositionsPage from "./pages/CompositionsPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/docs", component: DocsPage },
    { path: "/components/page-header", component: PageHeaderPage },
    { path: "/components/buttons", component: ButtonsPage },
    { path: "/components/input", component: InputPage },
    { path: "/components/number-box", component: NumberBoxPage },
    { path: "/components/select", component: SelectPage },
    { path: "/components/combobox", component: ComboboxPage },
    { path: "/components/date-time", component: DateTimePage },
    { path: "/components/slider", component: SliderPage },
    { path: "/components/radio", component: RadioPage },
    { path: "/components/checkbox", component: CheckboxPage },
    { path: "/components/toggle", component: TogglePage },
    { path: "/components/result", component: ResultPage },
    { path: "/components/empty", component: EmptyPage },
    { path: "/components/divider", component: DividerPage },
    { path: "/components/copyable-text", component: CopyableTextPage },
    { path: "/components/code", component: CodePage },
    { path: "/components/skeleton", component: SkeletonPage },
    { path: "/components/display", component: DisplayPage },
    { path: "/components/feedback", component: FeedbackPage },
    { path: "/components/navigation", component: NavigationPage },
    { path: "/components/breadcrumbs", component: BreadcrumbsPage },
    { path: "/components/sidebar", component: SidebarPage },
    { path: "/components/nav-tabs", component: NavTabsPage },
    { path: "/components/steps", component: StepsPage },
    { path: "/components/dropdown", component: DropdownPage },
    { path: "/components/drawer", component: DrawerPage },
    { path: "/components/confirm-dialog", component: ConfirmDialogPage },
    { path: "/components/tooltip", component: TooltipPage },
    { path: "/components/popover", component: PopoverPage },
    { path: "/components/modal", component: ModalPage },
    { path: "/components/contextmenu", component: ContextmenuPage },
    { path: "/components/overlays", component: OverlaysPage },
    { path: "/components/progress", component: ProgressPage },
    { path: "/components/pagination", component: PaginationPage },
    { path: "/components/upload", component: UploadPage },
    { path: "/components/avatar", component: AvatarPage },
    { path: "/components/tag", component: TagPage },
    { path: "/components/table", component: TablePage },
    { path: "/components/data-table", component: DataTablePage },
    { path: "/components/message", component: MessagePage },
    { path: "/components/kbd", component: KbdPage },
    { path: "/components/editor", component: EditorPage },
    { path: "/components/accordion", component: AccordionPage },
    { path: "/components/tree", component: TreePage },
    { path: "/components/compositions", component: CompositionsPage },
  ],
});
