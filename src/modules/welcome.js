const welcomeHeader = () => {
    const welcomeElement = document.createElement('h1');
    welcomeElement.innerHTML = "Welcome to TikType";
    return welcomeElement;
}

export {welcomeHeader};