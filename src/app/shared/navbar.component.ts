import { Component } from '@angular/core';

@Component({
    selector: 'nav-bar',
    template: `
        <div class="top-bar">
            <div class="top-bar-title">BitHaus Crypto Company</div>
            <div>
                <ul class="menu">
                    <li class="nav-menu"><a href="#">Menu Item 1</a></li>
                </ul>
            </div>
        </div>
    `,
    styleUrls: ['./navbar.component.css']
})
export class NavComponent {}
