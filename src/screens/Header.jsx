import React from 'react';

function Header(props) {

    return(
        <nav class="navbar bg-body-tertiary">
         <div class="container-fluid">
         <a class="navbar-brand" href="#">
            <img src="/logo192.png" alt="Logo"  width="30" height="24" class="d-inline-block align-text-top"></img>
            Sample API Request
        </a>
        <img src="/logo.svg" alt="Logo"  width="100" height="100" class="d-flex"></img>
        </div>
        </nav>
    )

}

export default Header;