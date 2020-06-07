import * as express from 'express';
import { AppSetting } from './config/app.setting';
import {
    ConfigController, UserController
} from './controllers';
// import { Api } from './helpers';
import { log } from 'util';

export class ApiRouting {
    static Register(app: express.Express) {
        const appConfig = AppSetting.getConfig().AppSettings;
        // app.use(appConfig.baseRoute + '/export/', express.static(__dirname + '/../export/'));
        app.use(appConfig.baseRoute + ConfigController.route, new ConfigController().router);
        // Set the default rotue after other routes are set
        app.use(appConfig.baseRoute + UserController.route, new UserController().router);
        // Registering the routes for formula
        // app.use(appConfig.baseRoute + FormulaController.route, new FormulaController().router);

        // // Registering routes for /ref
        // app.use(appConfig.baseRoute + ReferenceController.route, new ReferenceController().router);
        // app.use(appConfig.baseRoute + RecentItemController.route, new RecentItemController().router)
        // app.use(appConfig.baseRoute + WorkspaceController.route, new WorkspaceController().router);
        // app.use(appConfig.baseRoute + IngredientController.route, new IngredientController().router)
        // app.use(appConfig.baseRoute + BomController.route, new BomController().router);

        // // Registering routes for /settings
        // app.use(appConfig.baseRoute + SettingController.route, new SettingController().router);
        // app.use(appConfig.baseRoute + WorkspaceFormulaController.route, new WorkspaceFormulaController().router);
        // app.use(appConfig.baseRoute + TagController.route, new TagController().router);
        // app.use(appConfig.baseRoute + CommentController.route, new CommentController().router)
        // app.use(appConfig.baseRoute + ProjectController.route, new ProjectController().router)
        // app.use(appConfig.baseRoute + GroupController.route, new GroupController().router)

        // // Registering routes for /notifs
        // app.use(appConfig.baseRoute + NotificationController.route, new NotificationController().router)

        // // Registering routes for /sync
        // app.use(appConfig.baseRoute + SyncController.route, new SyncController().router)

        // // Route for perfumer list
        // app.use(appConfig.baseRoute + PerfumerListController.route, new PerfumerListController().router);

        // // Registering routes for /role
        // app.use(appConfig.baseRoute + RoleController.route, new RoleController().router);

        // // Registering routes for /worldclock
        // // app.use(appConfig.baseRoute + WorldClockController.route, new WorldClockController().router);

        // // Registering routes for /privileges
        // app.use(appConfig.baseRoute + PrivilegeController.route, new PrivilegeController().router);

        // // Registering routes for /assistantGroups
        // app.use(appConfig.baseRoute + AssistantController.route, new AssistantController().router);

        // // Registering routes for /log
        // app.use(appConfig.baseRoute + LogController.route, new LogController().router);

        // // Registering routes for /print
        // app.use(appConfig.baseRoute + PrintController.route, new PrintController().router);

        // // Prerequisite for Electron app
        // app.use(appConfig.baseRoute + PreRequisiteController.route, new PreRequisiteController().router);
    }
}
