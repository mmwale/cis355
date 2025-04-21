import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models';

export const showLogin = (req: Request, res: Response) => {
  res.render('login', { error: req.flash('error') });
};

export const login = passport.authenticate('local', {
  successRedirect: '/decks',
  failureRedirect: '/login',
  failureFlash: true
});

export const showRegister = (req: Request, res: Response) => {
  res.render('register', { error: req.flash('error') });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.create({
      username,
      email,
      password: hashedPassword
    });
    
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Registration failed');
    res.redirect('/register');
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
};