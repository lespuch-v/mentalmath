import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'dark-mode-toggle',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css'
})
export class DarkModeToggleComponent implements OnInit {
  isDarkMode!: boolean;

  ngOnInit(): void {
    this.checkIfDarkModeIsActive();
  }

  toggleDarkMode(): void {
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('dark-mode', 'false');
      this.isDarkMode = false;
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('dark-mode', 'true');
      this.isDarkMode = true;
    }
  }

  checkIfDarkModeIsActive(): void {
    const darkModeValue = localStorage.getItem('dark-mode');

    if (darkModeValue) {
      // Check if it's set to 'false' (light mode)
      if (darkModeValue === 'false') {
        document.documentElement.setAttribute('data-theme', 'light');
        this.isDarkMode = false;
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        this.isDarkMode = true;
      }
    } else {
      localStorage.setItem('dark-mode', 'true');
      this.isDarkMode = true;
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

}
