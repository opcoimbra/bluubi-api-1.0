import { Router } from "express";
import { SignInController } from './controller/sign-in-controller';
import { SignUpController } from './controller/sign-up-controller';
import { EventController } from './controller/event-controller';
import { DeleteAccountController } from './controller/delete-account-controller';
import { DeleteEventController } from './controller/delete-event-controller';
import { ChangePasswordUserController } from './controller/chage-password-user-controller';
import { ChangeUserEmailController } from './controller/change-email-user-controller';
import { FindUserController } from "./controller/find-user-controller";
import { HomeController } from "./controller/home-controller";


const router = Router();

const singInController= new SignInController();
const singUpController= new SignUpController();
const deleteAccountController= new DeleteAccountController();
const deleteEventController= new DeleteEventController();
const eventController = new EventController();
const changeUserPasswordController = new ChangePasswordUserController();
const changeUserEmailController = new ChangeUserEmailController();
const homeController = new HomeController();
const findUserController = new FindUserController()

router.post('/register', singUpController.handle);
router.post('/login', singInController.handle);
router.delete('/user/delete', deleteAccountController.handle);
router.delete('/event/delete', deleteEventController.handle);
router.post('/event/create', eventController.handle);
router.patch('/user/password/update', changeUserPasswordController.handle);
router.patch('/user/email/update', changeUserEmailController.handle);
router.get('/home', homeController.handle);
router.get('/user/find/', findUserController.handle);


export { router };